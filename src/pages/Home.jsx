import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Button } from 'primereact/button';
import { Fieldset } from 'primereact/fieldset';
import { Carousel } from 'primereact/carousel';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function Home() {
    const navigate = useNavigate();
    const [demos, setDemos] = useState([]);

    const features = [
        { feature: 'Pricing', basic: 'Free', pro: '$3.23/mo or $12.34/yr' },
        { feature: 'Templates', basic: '3 Start Templates', pro: 'All Templates' },
        { feature: 'upstack.cv Domain', basic: true, pro: true },
        { feature: 'Single Page Option', basic: true, pro: true },
        { feature: 'Multi-Page Option', basic: false, pro: true },
        { feature: 'Customization', basic: 'Limited Colors, Fonts & Display Modes', pro: 'Advanced Styling Controls' },
        { feature: 'Site Visitor Analytics', basic: false, pro: true }
    ];

    useEffect(() => {
        setDemos([
            { id: '1', name: 'Demo 1', image: 'https://placehold.co/800x600/1d1f21/ffffff?text=Modern' },
            { id: '2', name: 'Demo 2', image: 'https://placehold.co/800x600/ffffff/1d1f21?text=Minimalist' },
            { id: '3', name: 'Demo 3', image: 'https://placehold.co/800x600/3B82F6/ffffff?text=Creative' },
            { id: '4', name: 'Demo 4', image: 'https://placehold.co/800x600/10B981/ffffff?text=Professional' },
            { id: '5', name: 'Demo 5', image: 'https://placehold.co/800x600/F97316/ffffff?text=Vibrant' }
        ]);
    }, []);

    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    const demoTemplate = (demo) => {
        return (
            <div>
                <div>
                    <img src={demo.image} alt={demo.name} />
                </div>
                <div>
                    <h4>{demo.name}</h4>
                </div>
            </div>
        );
    };

    const plansBodyTemplate = (rowData, field) => {
        const value = rowData[field];
        if (typeof value === 'boolean') {
            return value ? 
                <i style={{ fontSize: '1.5rem' }}></i> : 
                <i style={{ fontSize: '1.5rem' }}></i>;
        }
        return value;
    };

    return (
        <div>
            <section>
                <h1>Turn Your Experience into a Beautiful Portfolio in Minutes</h1>
                <p>No code, no design stress, customized by you.</p>
                <Button label="START FOR FREE" size="large" onClick={() => navigate('/login')} />
            </section>

            <section id="how-it-works">
                <h2>How It Works</h2>
                <div>
                    <div>
                        <Fieldset legend="1. Add Your Info">
                            <p>
                                Easily input your professional experience, education, projects, and skills. Our intuitive forms make it simple to add and organize your content.
                            </p>
                        </Fieldset>
                    </div>
                    <div>
                        <Fieldset legend="2. Customize Your Template">
                            <p>
                                Choose from a variety of professionally designed templates. Customize colors, fonts, and layouts to match your personal brand.
                            </p>
                        </Fieldset>
                    </div>
                    <div>
                        <Fieldset legend="3. Choose a Domain & Publish">
                            <p>
                                Select a custom `upstack.cv` domain or connect your own. Publish your portfolio with one click and share it with the world.
                            </p>
                        </Fieldset>
                    </div>
                </div>
            </section>

            <section id="demos">
                <h2>Demos</h2>
                <div>
                    <Carousel value={demos} numVisible={3} numScroll={1} responsiveOptions={responsiveOptions} itemTemplate={demoTemplate} />
                </div>
            </section>

            <section id="plans">
                <h2>Plans & Pricing</h2>
                <div>
                    <DataTable value={features} showGridlines tableStyle={{ minWidth: '50rem' }}>
                        <Column field="feature" header="PLANS" style={{ width: '30%' }} />
                        <Column 
                            field="basic" 
                            header="BASIC" 
                            body={(rowData) => plansBodyTemplate(rowData, 'basic')} 
                            style={{ width: '35%' }} 
                        />
                        <Column 
                            field="pro" 
                            header="PRO" 
                            body={(rowData) => plansBodyTemplate(rowData, 'pro')} 
                            style={{ width: '35%' }} 
                        />
                    </DataTable>
                </div>
            </section>
        </div>
    );
}