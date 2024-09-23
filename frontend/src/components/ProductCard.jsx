import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  useColorModeValue,
  useToast,
  Modal,
  VStack,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  Button,
  ModalFooter,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product)
  const textColor = useColorModeValue("gray.600", "white");
  const bg = useColorModeValue("white", "gray.800");

  const toast = useToast();
  const { deleteProduct } = useProductStore();
  const handleDeleteProduct = async (id) => {
    const { success, message } = await deleteProduct(id);
    console.log("handling delete", success, message);
    if (success) {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { updateProduct } = useProductStore();
  const handleUpdateProduct = async () => {
    const { success, message } = await updateProduct(product._id, updatedProduct);
    onClose();
    if (success) {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }
  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w={"full"}
        objectFit={"cover"}
      />
      <Box p={4}>
        <Heading as={"h3"} size={"md"} mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
          Price: {product.price}
        </Text>
        <HStack spacing={2}>
          <IconButton icon={<EditIcon onClick={onOpen} />} colorScheme="blue" />
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDeleteProduct(product._id)}
            colorScheme="red"
          />
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input placeholder="Product Name" value={updatedProduct.name} name="name" onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})} />
              <Input placeholder="Product Price" value={updatedProduct.price} name="price" onChange={(e) => setUpdatedProduct({...updatedProduct, price: e.target.value})}/>
              <Input placeholder="Product Image URL" value={updatedProduct.image} name="image" onChange={(e) => setUpdatedProduct({...updatedProduct, image: e.target.value})}/>
            </VStack>
          </ModalBody>
          <ModalFooter >
            <Button colorScheme="blue" mr={3} onClick={()=> {handleUpdateProduct();}}>
                Update
            </Button>
            <Button variant={"ghost"} onClick={onClose}>
                Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
