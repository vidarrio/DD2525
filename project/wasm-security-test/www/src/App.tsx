import React, { useState, useEffect, createContext } from 'react';
import Header from './components/General/Header';
import MemorySafety from './components/Exploits/MemorySafety/MemorySafety';
import CodeInjection from './components/Exploits/CodeInjection/CodeInjection';
import SideChannels from './components/Exploits/SideChannels/SideChannels';
import SandboxEscapes from './components/Exploits/SandboxEscapes/SandboxEscapes';
import Concurrency from './components/Exploits/Concurrency/Concurrency';
import Home from './components/General/Home';
import ControlFlow from './components/Exploits/ControlFlow/ControlFlow';
import * as wasm from 'wasm-security-test';
import { ThemeProvider } from './ThemeContext';

// Create a context for WASM errors
export const WasmErrorContext = createContext<{
  errors: string[];
  addError: (error: string) => void;
  clearErrors: () => void;
}>({
  errors: [],
  addError: () => {},
  clearErrors: () => {},
});

const App: React.FC = () => {
    const [activePage, setActivePage] = useState<string>('home');
    const [wasmErrors, setWasmErrors] = useState<string[]>([]);

    const addWasmError = (error: string) => {
        setWasmErrors([error]); // Replace all previous errors with just the new one
    };

    const clearErrors = () => {
        setWasmErrors([]);
    };

    useEffect(() => {
        // Handle navigation via URL hash
        const handleHashChange = () => {
            const hash = window.location.hash.substring(1) || 'home';
            setActivePage(hash);
            clearErrors();
        };

        // Set initial page based on URL hash
        handleHashChange();

        // Listen for hash changes
        window.addEventListener('hashchange', handleHashChange);

        // Capture WASM errors
        const originalConsoleError = console.error;
        console.error = (...args) => {
            originalConsoleError(...args);
            const errorMessage = args.join(' ');
            if (errorMessage.includes('wasm') || errorMessage.includes('panic')) {
                addWasmError(errorMessage);
            }
        };

        // Add wasm error logging
        wasm.set_panic_hook();
        
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
            console.error = originalConsoleError;
        };
    }, []);

    return (
        <ThemeProvider>
            <WasmErrorContext.Provider value={{ errors: wasmErrors, addError: addWasmError, clearErrors }}>
                <Header activePage={activePage} />
                
                <main id="content">
                    {activePage === 'home' && <Home />}
                    {activePage === 'memory-safety' && <MemorySafety />}
                    {activePage === 'code-injection' && <CodeInjection />}
                    {activePage === 'side-channels' && <SideChannels />}
                    {activePage === 'sandbox-escapes' && <SandboxEscapes />}
                    {activePage === 'concurrency' && <Concurrency />}
                    {activePage === 'control-flow' && <ControlFlow />}
                </main>
                
                <footer>
                    <p>WebAssembly Security Project for DD2525</p>
                </footer>
            </WasmErrorContext.Provider>
        </ThemeProvider>
    );
};

export default App;