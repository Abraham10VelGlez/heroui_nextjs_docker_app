"use client"
import React from "react";
import { Card, Skeleton, Button, Input, Avatar } from "@heroui/react";
import { Auth } from "@/hooks/Auth";
interface LoginxProps {
    isLoaded: boolean;
    toggleLoad: () => void;
}
export default function Loginx({ isLoaded, toggleLoad }: LoginxProps) {
    const { formik_validatelogon, loaddatax } = Auth()
    return (
        <>
            <form className="flex flex-col gap-4" onSubmit={formik_validatelogon.handleSubmit}>
                <Card className="w-[200px] space-y-3 p-4" radius="lg">
                    <Skeleton className="rounded-lg " isLoaded={isLoaded}>
                        <center>
                            {/*<Skeleton className="flex rounded-full w-24 h-24" />*/}
                            <Avatar size="lg" isBordered color="success" src="/images/logo.png" />
                        </center>
                    </Skeleton>

                    <div className="space-y-3">

                        <Skeleton className="w-5/5 rounded-lg" isLoaded={isLoaded}>
                            <div className="w-5/5 rounded-lg "  >
                                <Input
                                    id="u"
                                    name="u"

                                    label="Usuario"
                                    labelPlacement="outside"
                                    type="text"
                                    value={formik_validatelogon.values.u}
                                    onChange={formik_validatelogon.handleChange}
                                    isInvalid={!!(formik_validatelogon.touched.u && formik_validatelogon.errors.u)}
                                    color={formik_validatelogon.touched.u && formik_validatelogon.errors.u ? "danger" : "default"}
                                    errorMessage={formik_validatelogon.touched.u && formik_validatelogon.errors.u}
                                />
                            </div>
                        </Skeleton>

                        <Skeleton className="w-5/5 rounded-lg" isLoaded={isLoaded}>
                            <div className="w-5/5 rounded-lg " >
                                <Input
                                    id="p"
                                    name="p"

                                    label="Contraseña"
                                    labelPlacement="outside"
                                    type="text"
                                    value={formik_validatelogon.values.p}
                                    onChange={formik_validatelogon.handleChange}
                                    isInvalid={!!(formik_validatelogon.touched.p && formik_validatelogon.errors.p)}
                                    color={formik_validatelogon.touched.p && formik_validatelogon.errors.p ? "danger" : "default"}
                                    errorMessage={formik_validatelogon.touched.p && formik_validatelogon.errors.p}

                                />
                            </div>
                        </Skeleton>
                    </div>

                </Card>

                {isLoaded ?
                    (

                        <Button color="success" size="sm" variant="flat" type="submit" isLoading={loaddatax} >
                            {loaddatax ? 'Cargando Sesión' : 'Iniciar Sesión'}
                        </Button>
                    ) : (
                        <Button color="danger" size="sm" variant="flat" onPress={toggleLoad} type="button">
                            Comenzar
                        </Button>
                    )}
            </form>
        </>
    );
}