import { Container } from "react-bootstrap";
import MyTheaterCard from "../../src/components/theatercard/TheaterCard";
import MyTheaterSearchBar from "../../src/components/theatersearchbar/TheaterSearchBar";
import PageNavigation from "../../src/components/pagenavigation/PageNavigation"
export default function Theater() {
  return (
    <>
      <Container className="my-5 ">
        <MyTheaterSearchBar />
      </Container>
      <MyTheaterCard />
    </>
  )
}
