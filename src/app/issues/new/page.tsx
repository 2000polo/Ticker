"use client";

import { Box, Button, Flex, Heading, Select, Text, TextField } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface IssueForm {
    title: String,
    description: String,
    category: String
}

const NewIssuesPage = () => {
    const redirect = useRouter();
    const { register, control, handleSubmit } = useForm<IssueForm>()

    const issueFormSubmitHandler = async (data: IssueForm) => {
        console.log(data);
        await axios.post('/api/issues', data)
        // redirect.push('/issues')
    }

    return (
        <section className='flex w-full flex-col px-72'>
            <Box className='mb-6'>
                <Flex direction={"column"}>
                    <Heading size="6">Create new issue</Heading>
                    <Text className='text-gray-700' size="3">The quick brown fox jumps over the lazy dog.</Text>
                </Flex>
            </Box>
            <form className='flex w-full flex-col' onSubmit={handleSubmit((data) => issueFormSubmitHandler(data))}>
                <Flex direction="column" gap="3">
                    <Box >
                        <Flex direction="row" gap="3">
                            <Box className='w-[70%]' >
                                <Text size="2">Title</Text>
                                <TextField.Root {...register('title')} size="3" placeholder="Enter the title of the ticket" />
                            </Box>
                            <Box className='w-[30%]' >
                                <Text size="2">Ticker Category</Text>
                                <Flex>
                                    <Controller
                                        name='category'
                                        control={control}
                                        render={({ field: { value, onChange } }) => (
                                            <Select.Root value={value as string} onValueChange={onChange} size={'3'}>
                                                <Select.Trigger placeholder='Select the category' style={{
                                                    width: '100%', // Set the trigger width
                                                }} />
                                                <Select.Content position='popper'>
                                                    <Select.Group {...register('category')} >
                                                        <Select.Item value="Bug">Bug</Select.Item>
                                                        <Select.Item value="Feature">Feature</Select.Item>
                                                        <Select.Item value="Modification">Modification</Select.Item>
                                                    </Select.Group>
                                                </Select.Content>
                                            </Select.Root>
                                        )}
                                    />

                                </Flex>
                                {/* <TextField.Root size="3" placeholder="Select the ticket category" /> */}

                            </Box>
                        </Flex>
                    </Box>
                    <Box >
                        <Text size="2">Description</Text>
                        <Controller
                            name='description'
                            control={control}
                            render={({ field: { onBlur, value, onChange } }) => (
                                <SimpleMDE placeholder='Enter the bug description' onChange={onChange} // send value to hook form
                                    onBlur={onBlur} // notify when input is touched/blur
                                />
                            )}
                        />
                    </Box>
                </Flex>
                <Button size={'3'}>Generate Ticket</Button>
            </form>
        </section>
    )
}

export default NewIssuesPage;