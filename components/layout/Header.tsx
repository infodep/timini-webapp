import { AppBar, Container } from "@mui/material";
import Link from "next/link";
import { LoginBox } from "../login/LoginBox";
import Image from "next/image";
import AuthContext from "../../contexts/auth";
import { useContext } from "react";

export const Header = (): JSX.Element => {
  const { user_id } = useContext(AuthContext);
  return (
    <AppBar className="header" position="relative">
      <Container>
        <Image src="/../../assets/images/logo.svg" alt="Timini" width="224px" height="75px" />
        <div>
          <LoginBox />
          <div className="profile-box">I am the profile box now {user_id}</div>
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
