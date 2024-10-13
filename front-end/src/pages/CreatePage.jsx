import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { useProductStore } from "../store/product"

const CreatePage = () => {
  const [newProduct,setNewProduct]=useState({
    name: "",
    price: "",
    image: ""
  })

  const toast = useToast()
  const {createProduct} = useProductStore()
  const haddleAddProduct = async () => {
    // const {success,message} = await createProduct(newProduct)
    toast.promise(createProduct(newProduct), {
      success: { title: 'Product Created', description: 'Product Created Successfully.' },
      error: { title: 'Error.', description: 'Something wrong' },
      loading: { title: 'Creating Product', description: 'Please wait' },
    })
  setNewProduct({name:'',price:"",image:""})
  }

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>Create New Product</Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white","gray.800")}
          p={6} rounded={"lg"} shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct,name:e.target.value })}
            />
            <Input 
              placeholder="Product Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({...newProduct,price:e.target.value})}
            />
            <Input
              placeholder="Image"
              name="image"
              value={newProduct.image}
              onChange={(e) => setNewProduct({...newProduct,image:e.target.value})}
            />
            <Button colorScheme="blue" onClick={haddleAddProduct} w="full">
              Add Product
            </Button>  
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage