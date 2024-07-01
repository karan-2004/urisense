import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Layout() {
      
	return (
		<>
			<nav className="flex p-2 bg-slate-300">
                <Link to="/">URISENSE</Link>
            </nav>
            <Outlet/>
		</>
	);
}
