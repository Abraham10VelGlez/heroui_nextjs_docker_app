"use client"
import React from "react";
import { Card, Skeleton, Button, Input, Avatar } from "@heroui/react";

export default function Skeletonx() {
    const [isLoaded, setIsLoaded] = React.useState(false);

    const toggleLoad = () => {
        setIsLoaded(!isLoaded);
    };

    return (
        <div className="flex flex-col gap-3">
            <Card className="w-[200px] space-y-5 p-4" radius="lg">
                <Skeleton className="rounded-lg " isLoaded={isLoaded}>
                    <center>
                        {/*<Skeleton className="flex rounded-full w-24 h-24" />*/}
                        <Avatar size="lg" isBordered color="success" src="/images/logo.png" />
                    </center>
                </Skeleton>

                <div className="space-y-6">

                    <Skeleton className="w-5/5 rounded-lg" isLoaded={isLoaded}>
                        <div className="h-5 w-full rounded-lg "  >
                            <Input 
                                isRequired
                                label="Usuario"
                                labelPlacement="outside"
                                name="username"
                                type="text"
                                validate={(value) => {
                                    if (value.length < 3) {
                                        return "Username must be at least 3 characters long";
                                    }

                                    return value === "admin" ? "Nice try!" : null;
                                }}
                            />
                        </div>
                        &nbsp;
                    </Skeleton>

                    <Skeleton className="w-5/5 rounded-lg" isLoaded={isLoaded}>
                        <div className="h-10 w-full rounded-lg " >
                            <Input
                                isRequired
                                label="Contraseña"
                                labelPlacement="outside"
                                name="username"
                                type="text"
                                validate={(value) => {
                                    if (value.length < 3) {
                                        return "Username must be at least 3 characters long";
                                    }

                                    return value === "admin" ? "Nice try!" : null;
                                }}
                            />
                        </div>
                    </Skeleton>

                </div>
            </Card>
            <Button color="danger" size="sm" variant="flat" onPress={toggleLoad}>
                {/*isLoaded ? "Show" : "Hide"*/} Iniciar
            </Button>
        </div>
    );
}

