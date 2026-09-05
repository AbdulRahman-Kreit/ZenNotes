import React from 'react'
import { Outlet, Link } from 'react-router-dom'

export default function MinimalLayout() {
    return (
        <main className="min-h-screen bg-gray-900 text-white p-6">
            <Outlet />
        </main>
    )
}
