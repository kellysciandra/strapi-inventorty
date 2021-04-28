import Link from 'next/link';
import { Button, Table} from 'semantic-ui-react';
import {ItemsContainer, ItemsHeader} from './index.styles'
import { useEffect, useState } from 'react';
import axios from 'axios';

const Index = () => {

    const [products, setProducts] = useState();
    const [stockEvents, setStockEvents] = useState();


    useEffect(() => {
        axios({
            "method": "GET",
            "url": "http://localhost:1337/products"
        })
        .then((response) => {
            setProducts(response.data)
        })

        axios({
            "method": "GET",
            "url": "http://localhost:1337/stockevents"
        })
        .then((response) => {
            setStockEvents(response.data)
        })
    }, []);

  return (
    <ItemsContainer>
      <ItemsHeader>Warehouse Inventory</ItemsHeader>

        <Table celled>
            <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Product</Table.HeaderCell>
                <Table.HeaderCell>Total</Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
            </Table.Header>
  
      {products ? products.map(item => {
          return (
                    <Table.Body>
                    <Table.Row>
                        <Table.Cell>
                            <Link href={`/${item.id}`}>
                                <a>{item.name}</a>
                            </Link>
                        </Table.Cell>
                        <Table.Cell>{item.qty}</Table.Cell>
                        <Table.Cell collapsing textAlign='right'>
                            <Link href={`/${item.id}`}>
                                <Button primary>View</Button>
                            </Link>
                            <Link href={`/${item.id}/edit`}>
                                <Button color="orange">Edit</Button>
                            </Link>
                        </Table.Cell>
                    </Table.Row>
                    </Table.Body>
          )
      }): "no"}
        </Table>
    </ItemsContainer>
  )
}

export default Index;