import { Container, SimpleGrid, Text, useToast, VStack } from "@chakra-ui/react";
import { color } from "framer-motion";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  

  return (
    <Container maxWidth={"container.xl"} py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          textAlign={"center"}
          bgClip={"text"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
        >
          Current Products 🚀
        </Text>
        {
          products.length > 0 && (<SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={10}
            w={"full"}
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>)
        }
        {products.length === 0 && (<Text
          fontSize={"xl"}
          textAlign={"center"}
          fontWeight={"bold"}
          color={"gray.500"}
        >
          No Products Found Here :({" "}
          <Link to="/create">
            <Text
              as={"span"}
              color={"blue.500"}
              _hover={{ textDecoration: "underline" }}
            >
              Create a New Product
            </Text>
          </Link>
        </Text>)}
      </VStack>
    </Container>
  );
};

export default HomePage;
