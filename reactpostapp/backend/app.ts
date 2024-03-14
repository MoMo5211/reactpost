import 'dotenv/config';
import express from "express";
import cors from "cors";
import { Request, Response, NextFunction } from 'express';
import jwt, {JwtPayload, VerifyErrors }from "jsonwebtoken";
import {
  findUserById,
  IDecodedUser,
  verifyUser,
  parseToken,
  addPost,
  posts,
  sleep,
  users
} from "./fakedb";

interface MyTokenPayload extends JwtPayload {
  id: number | string; 
}

const port = 8085;
const app = express();
app.use(cors());
app.use(express.json());

// TODO: Obviously use a more secure signing key than "secret"
app.post("/api/user/login", (req, res) => {
  try {
    const { email, password } = req.body;
    const user = verifyUser(email, password);
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "2 days",
    });
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.post("/api/user/validation", (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = parseToken(authHeader, res);
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = findUserById((decodedUser as IDecodedUser).id);
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if (token == null) return res.sendStatus(401); // if no token found

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) return res.sendStatus(403); // if token is not valid
    const user = decoded as MyTokenPayload;
    if (user) {
      (req as any).userId = user.id;
    }
    next(); 
  });
};

export default authenticateToken;


// Fetch posts
app.get("/api/posts", authenticateToken, async (req, res) => {
  await sleep(2000); // Simulate delay
  res.json(posts); // Return the list of posts
});

// Create a new post
app.post("/api/posts", authenticateToken, async (req, res) => {
  const post = req.body;
  post.userId = (req as any).userId; // Attach userId from authenticated user
  const addedPost = addPost(post); 
  res.status(201).json(addedPost); // Return the newly created post
});

// ⭐️ TODO: Implement this yourself
app.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const post = posts.find(post => post.id === parseInt(id, 10)); // Convert id to number

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  const user = users.find(user => user.id === post.userId);
  if (!user) {
    return res.status(404).json({ error: "Author not found" });
  }

  // Extract the author's name from their email
  const authorName = user.email.split('@')[0];

  res.json({...post, authorName});
});

/**
 * Problems with this:
 * (1) Authorization Issues:
 *     What if you make a request to this route WITHOUT a token?
 *     What if you make a request to this route WITH a token but
 *     it's invalid/expired?
 * (2) Server-Side Validation Issues:
 *     What if you make a request to this route with a valid token but
 *     with an empty/incorrect payload (post)
 */


app.put("/api/posts/:id", async (req, res) => {
  // Extract the post ID from the URL parameters
  const { id } = req.params;
  // Find the post in the database
  const postIndex = posts.findIndex(post => post.id === parseInt(id, 10));
  
  if (postIndex === -1) {
    return res.status(404).json({ error: "Post not found" });
  }
  
  // Update the post with new data from the request body
  const updatedPost = { ...posts[postIndex], ...req.body };
  posts[postIndex] = updatedPost;

  // Respond with the updated post
  res.json(updatedPost);
});

app.listen(port, () => console.log("Server is running"));
