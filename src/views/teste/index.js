import React from 'react'

import { Header, Sidebar, Footer } from "../../components/dashboardLayout"

export default function Teste() {

    return (
        <div className="c-app c-default-layout">
            <Sidebar />
            <div className="c-wrapper">
                <Header />
                <div className="c-body">
                    conteudo
                </div>
                <Footer />
            </div>
        </div>
    )
}