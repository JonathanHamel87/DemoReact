import React, {Component} from "react";
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavBar from "./AppNavBar";
import {Link, withRouter} from "react-router-dom";

class CarEdit extends Component{
    emptyItem = {
        color: '',
        brand: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const car = await (await fetch(`/cars/${this.props.match.params.id}`)).json();
            this.setState({item: car});
        }
    }

    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let item = {...this.state.item};
        item[name] = value;

        this.setState({item});

    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        await fetch('/cars'+ (item.id ? '/' + item.id: ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        this.props.history.push('/cars');
    }



    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Edit Car' : 'Add Car'}</h2>;

        return <div>
            <AppNavBar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="color">Color</Label>
                        <Input type="text" name="color" id="color" defaultValue={item.color || ''}
                               onChange={this.handleChange} autoComplete="color"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="brand">Brand</Label>
                        <Input type="text" name="brand" id="brand" defaultValue={item.brand || ''}
                               onChange={this.handleChange} autoComplete="brand"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>
                        <Button color="secondary" tag={Link} to="/cars">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(CarEdit);