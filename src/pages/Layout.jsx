import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Layout() {
      
	return (
		<>
			<nav className="flex p-3 shadow-lg">
                <Link to="/" className="text-3xl font-extrabold text-stone-600">URISENSE</Link>
            </nav>
            <Outlet/>
		</>
	);
}
