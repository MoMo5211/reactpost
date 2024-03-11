import React from "react";
import classes from "./Navbar.module.css";
import SVGComponent from './svgviewer-react-output';
import { Container, Group, Burger, Drawer, Stack } from "@mantine/core";
import useLinks from "./useLinks";
import { DrawerContext } from "../../Contexts/drawerContext";

const Navbar = () => {
  const { opened, toggle } = React.useContext(DrawerContext);
  const [items] = useLinks();

  return (
    <header className={classes.header} >
      <div size="md" className={classes.inner}>
      <Group>
      <SVGComponent />
      <h2>SnapInn</h2>
      </Group>
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>
        <Burger hiddenFrom="xs" opened={opened} onClick={toggle} />
        <Drawer
          withCloseButton={true}
          opened={opened}
          onClose={toggle}
        >
          <Stack>{items}</Stack>
        </Drawer>
      </div>
    </header>
  );
};

export default Navbar;
