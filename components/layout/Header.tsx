import { AppBar, Container } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { UserOrLogin } from "../user/UserOrLogin";

export const Header = (): JSX.Element => {
  return (
    <AppBar className="header" position="relative">
      <Container>
        <Image src="/../../assets/images/logo.svg" alt="Timini" width="224px" height="75px" />
        <div>
          <UserOrLogin />
        </div>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/articles">
            <a>Articles</a>
          </Link>
        </nav>
      </Container>
    </AppBar>
  );
};
