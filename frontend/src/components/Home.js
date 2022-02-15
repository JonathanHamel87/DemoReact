import {Component} from "react";
import {Link} from "react-router-dom";
import AppNavBar from "./AppNavBar";
import {Button, Container} from "reactstrap";

class Home extends Component{
    render() {
        return(
            <div>
                <AppNavBar/>
                <Container fluid>
                    <Button color="link">
                        <Link to="/cars">Cars</Link>
                    </Button>
                </Container>
            </div>
        );
    }
}
export default Home;