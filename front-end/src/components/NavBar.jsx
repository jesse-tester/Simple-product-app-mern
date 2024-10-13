import { Button, Container, Flex, HStack, Text, useColorMode } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { CgAddR } from "react-icons/cg";
import { FiSun, FiMoon } from "react-icons/fi";

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"1140px"} px={"4"} >
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base:"column",
          sm:"row"
        }}
      >
        
        <Text
					fontSize={{ base: "22", sm: "28" }}
					fontWeight={"bold"}
					textTransform={"uppercase"}
					textAlign={"center"}
					bgGradient={"linear(to-r, cyan.400, blue.500)"}
					bgClip={"text"}
				>
					<Link to={"/"}>Product Store 🛒</Link>
				</Text>

        <HStack spacing={2} alignItems={"center"} >
          <Link to={"/create"} >
            <Button>
              <CgAddR fontSize={25} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light"? <FiSun fontSize={25} />:<FiMoon fontSize={25} />}
          </Button>
        </HStack>

      </Flex>
    </Container>
  )
}

export default NavBar

