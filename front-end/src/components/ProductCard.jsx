/* eslint-disable react/prop-types */
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, VStack } from "@chakra-ui/react"
import { useProductStore } from "../store/product";
import { useRef, useState } from "react";


const ProductCard = ({ product }) => {
    const textColor = useColorModeValue('gray.600', 'gray.200')
    const bg = useColorModeValue('white', 'gray.800')

    const [updatedProduct, setUpdatedProduct] = useState(product)
    const { deleteProduct, updateProduct } = useProductStore()
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isConfirmationOpen, onOpen: onConfirmationOpen, onClose: onConfirmationClose } = useDisclosure();
    const cancelRef = useRef()

    const haddleProductDelete = async (pid) => {
        // const { success, message } = await deleteProduct(pid)
        toast.promise(deleteProduct(pid), {
            success: { title: 'Product Deleted', description: 'Product Deleted Successfuly.' },
            error: { title: 'Error.', description: 'Something wrong' },
            loading: { title: 'Deleting...', description: 'Please wait' },
          })
    }

    const haddleUpdateProduct = async (pid, updatedProduct) => {
        // await updateProduct(pid, updatedProduct)
        toast.promise(updateProduct(pid,updatedProduct), {
            success: { title: 'Product Updated', description: 'Looks great' },
            error: { title: 'Error.', description: 'Something wrong' },
            loading: { title: 'Updating...', description: 'Please wait' },
          })
        onClose()
    }

    return (
        <Box
            shadow='lg'
            rounded={'lg'}
            overflow={'hidden'}
            transition={'all 0.3s'}
            _hover={{ transform: "translateY(-5px)", shadow: "x1" }}
            bg={bg}
        >
            <Image src={product.image} alt={product.name} h={48} w={'full'} objectFit={'cover'} />
            <Box p={4}>
                <Heading as={"h3"} size={"md"} mb={2} >
                    {product.name}
                </Heading>
                <Text fontWeight={'bold'} fontSize={'xl'} mb={4} color={textColor} >
                    {product.price}
                </Text>
                <HStack spacing={2}>
                    <IconButton icon={<FiEdit />} onClick={onOpen} colorScheme="blue" />
                    <IconButton icon={<MdDeleteOutline />} onClick={onConfirmationOpen} colorScheme="red" />
                </HStack>
            </Box>

            {/* Confirmation for Deleting the Product */}
            <AlertDialog
                isOpen={isConfirmationOpen}
                leastDestructiveRef={cancelRef}
                onClose={onConfirmationClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Product
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You want to delete the item.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onConfirmationClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={() => haddleProductDelete(product._id)} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

            {/* Update Product Form */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder="Product Name"
                                name="name"
                                value={updatedProduct.name}
                                onChange={(e) => setUpdatedProduct({ ...updateProduct, name: e.target.value })}
                            />
                            <Input
                                placeholder="Product Price"
                                name="price"
                                type="number"
                                value={updatedProduct.price}
                                onChange={(e) => setUpdatedProduct({ ...updateProduct, price: e.target.value })}
                            />
                            <Input
                                placeholder="Image"
                                name="image"
                                value={updatedProduct.image}
                                onChange={(e) => setUpdatedProduct({ ...updateProduct, image: e.target.value })}
                            />
                            <ModalFooter>
                                <Button colorScheme="blue" mr={3} onClick={() => haddleUpdateProduct(product._id, updatedProduct)} w="full">
                                    Update
                                </Button>
                                <Button colorScheme="blue" onClick={onclose} w="full" >
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>

        </Box>
    )
}

export default ProductCard