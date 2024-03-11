import { Container, Group, Anchor } from '@mantine/core';
import SVGComponent from './svgviewer-react-output';
import classes from './FooterLinks.module.css';

const links = [
  { link: '#', label: 'Contact' },
  { link: '#', label: 'Privacy' },
  { link: '#', label: 'Blog' },
  { link: '#', label: 'Careers' },
];

export default function FooterSimple() {
  const items = links.map((link) => (
    <Anchor
      key={link.label}
      href={link.link}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <SVGComponent />
        <Group className={classes.links}>{items}</Group>
      </div>
    </div>
  );
}

