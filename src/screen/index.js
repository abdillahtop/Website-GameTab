import React, { Component } from 'react';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Col
} from 'reactstrap'
import axios from 'axios'
import Swal from 'sweetalert2'
import '../App.css';

export default class App extends Component {
    constructor() {
        super()
        this.state = {
            pattern: 0
        }
    }
    componentDidMount() {
        axios.get('https://gametab-api.herokuapp.com/pattern')
            .then((result) => {
                this.setState({
                    pattern: result.data.result[0].pattern
                })
            })
    }

    updatePattern(data) {
        const { pattern } = this.state
        if (pattern.length < 5) {
            Swal.fire('Masukkan pattern lebih dari 5!')
        } else {
            axios.post('https://gametab-api.herokuapp.com/pattern/1', data, {

            })
                .then((result) => {
                    Swal.fire('Pattern telah terupdate!!')
                })
        }
    }

    render() {
        let data = {
            pattern: this.state.pattern
        }
        return (
            <div className="App-header">
                <div style={{ width: '50%' }}>
                    <div style={{textAlign: 'center', fontSize: 30}}>
                        <text className="now">Pattern Now : </text>
                        <text >{this.state.pattern}</text>
                    </div>
                    <Form>
                        <FormGroup >
                            <Label sm={3}>Input Pattern</Label>
                            <Col sm={12}>
                                <Input
                                    type="number"
                                    name="book_name"
                                    placeholder="input pattern.."
                                    bsSize="lg"
                                    onChange={(e) => this.setState({ pattern: e.target.value })} />
                            </Col>
                            <Button
                            style={{float: "right", marginRight: 20, marginTop: 20  }}
                            onClick={() => this.updatePattern(data)}
                            color="success">Change Pattern</Button>
                        </FormGroup>
                        
                    </Form>
                </div>
            </div>
        );
    }
}