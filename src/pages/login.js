import React, { useState, useEffect } from 'react';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'


export default function SimpleCard() {
    const [user, setUser] = useState(null);
    const firebaseConfig = {
        apiKey: "AIzaSyB1Nu9lDwx3wSKARdpMS552ckto9JiBYXc",
        authDomain: "loginpage-347a9.firebaseapp.com",
        projectId: "loginpage-347a9",
        storageBucket: "loginpage-347a9.appspot.com",
        messagingSenderId: "948424140737",
        appId: "1:948424140737:web:07bb52bb155d46f23fb140"
    };

    const app = firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            setUser(user);
            console.log(user)
        });
    }, []);

    async function HandleLogin() {

        auth.signInWithPopup(provider).then(() => console.log("LOGGED IN"));
    }

    function LoginButton() {
        return (
            <Button onClick={(e) => HandleLogin()} leftIcon={<FcGoogle />} colorScheme='gray' variant='solid'>
                Sign in with Gmail
            </Button>
        )
    }

    function HelloComp(prop) {
        return (
            <Box w={'100%'} justifyContent='center' alignItems='center'>
                <Text>Hello! {prop.name}</Text>
                <Button onClick={(e) => {
                    auth.signOut();
                }}>Logout</Button>
            </Box>

        )
    }

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'center'}
                                justify={'space-between'}
                                justifyContent={'center'}
                                alignItems={'center'}
                            >

                            </Stack>

                            {user ? <HelloComp name={user.displayName} /> : <LoginButton />}
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}