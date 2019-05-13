import React from 'react'
import {Table} from 'reactstrap'
import axios from '../../config/axios';
import {Link} from 'react-router-dom'

class TableDisplay extends React.Component{
    constructor(){
        super()
        this.state={
            children :[],
            currentPage:1,
            childrenPerPage:3
        }
        this.handleClick = this.handleClick.bind(this);

    }
    componentDidMount(){
        console.log('entered cdid mount')
        axios.get('/child')
        .then((response)=>{
            console.log(response.data)
            this.setState(()=>({children:response.data}))
        })
        .catch((err)=>{
            console.log(err)
        })
    }
     calage(dob) { 
         console.log(dob)
        var diff_ms = Date.now() - dob.getTime();
        var age_dt = new Date(diff_ms); 
      
        return Math.abs(age_dt.getUTCFullYear() - 1970);
    }
    handleClick(event) {
        this.setState({
          currentPage: Number(event.target.id)
        });
      }

    render(){
        const {children,currentPage,childrenPerPage} = this.state
        console.log(children,currentPage,childrenPerPage)
        //logic for displaying current children
        const indexOfLastChild = currentPage * childrenPerPage;
        const indexOfFirstChild = indexOfLastChild - childrenPerPage;
        const currentChildren = children.slice(indexOfFirstChild,indexOfLastChild)
        const renderChildren = currentChildren.map((child,index)=>{
            
            return <tr key={index}>
            <td>{index+1}</td>
            <Link to={`/child/${child._id}/assesment`}>{<td>{child.name}</td>}</Link>
            <td>{this.calage(new Date(child.dob))}</td>
            <td>{child.gender}</td>
            <td>{child.majorConcerns}</td>
            <td>{child.email}</td>
            <td><img alt='' src={child.childPhoto} width="100" height="100"/></td>
            </tr>
        })
        //logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(children.length / childrenPerPage); i++) {
          pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
          return (
            <li
              key={number}
              id={number}
              onClick={this.handleClick}
            >
              {number}
            </li>
          );
        });
        return(
            <div>
                <Table>
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>name</td>
                            <td>age</td>
                            <td>gender</td>
                            <td>majorConcerns</td>
                            <td>MotherEmail</td>
                            <td>photo</td>
                        </tr>
                    </thead>
                    <tbody>
                        {renderChildren}
                    </tbody>
                </Table>
               <ul id="page-numbers">
                {renderPageNumbers}
                </ul>
            </div>
        )
    }
}
export default TableDisplay