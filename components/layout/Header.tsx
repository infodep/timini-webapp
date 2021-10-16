import { AppBar, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Link from "next/link";
import { LoginBox } from "../login/LoginBox";
import Image from "next/image";

const useStyles = makeStyles(() => ({
  profileBox: {
    float: "right",
  },
}));

export const Header = (): JSX.Element => {
  const classes = useStyles();
  return (
    <AppBar className="header" position="relative">
      <Container>
        <Image src="/../../assets/images/logo.svg" alt="Timini" width="224px" height="75px" />
        <div className={classes.profileBox}>
          <LoginBox />
          <div className="profile-box">I am the profile box now</div>
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
