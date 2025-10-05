import { useEffect, useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { useAuth } from '../context/AuthContext';
import { signOut } from '../utils/authentication';
import Loading from '../pages/Loading';
import { Button } from 'primereact/button';
import { ToggleButton } from 'primereact/togglebutton';
import { useNavigate } from 'react-router';

export default function Navbar({ theme, setTheme }) {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [isSubdomain, setIsSubdomain] = useState(false);

    useEffect(() => {
        const hostname = window.location.hostname;
        if (hostname.split('.').length > 2) {
            setIsSubdomain(true);
        }
    }, []);

    const homeItems = [
        { label: "Home", url: "/" },
        { label: "How It Works", url: "#how-it-works" },
        { label: "Demos", url: "#demos" },
        { label: "Plans", url: "#plans" }
    ];

    const portfolioItems = [
        { label: "Home", url: "/" },
        { label: "About", url: "/about" },
        { label: "Projects", url: "/projects" },
        { label: "Experience", url: "/experience" },
        { label: "Education", url: "/education" },
    ];

    const start = <span>Upstack</span>;

    const end = (
        <>
            {user ? (
                <div className="flex align-items-center gap-2">
                    <ToggleButton
                        onLabel=""
                        offLabel=""
                        onIcon="pi pi-sun"
                        offIcon="pi pi-moon"
                        checked={theme === 'light'}
                        onChange={(e) => setTheme(e.value ? 'light' : 'dark')}
                    />
                    {!isSubdomain && (
                        <>
                            <Button label="Manage Portfolio" onClick={() => navigate('/manage-portfolio')} />
                            <Button label="Sign Out" onClick={() => signOut(navigate)} />
                        </>
                    )}
                </div>
            ) : (
                !isSubdomain && (
                    <div className="flex align-items-center gap-2">
                        <ToggleButton
                            onLabel=""
                            offLabel=""
                            onIcon="pi pi-sun"
                            offIcon="pi pi-moon"
                            checked={theme === 'light'}
                            onChange={(e) => setTheme(e.value ? 'light' : 'dark')}
                        />
                        <Button label="Sign In" onClick={() => navigate('/login')} />
                    </div>
                )
            )}
        </>
    );

    if (loading) return <Loading />;

    return (
        <Menubar
            model={isSubdomain ? portfolioItems : homeItems}
            start={start}
            end={end}
        />
    );
}
