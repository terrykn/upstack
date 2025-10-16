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
            breakpoint: '3000px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '1024px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '768px',
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
            <section id="home">
                <div className="hero">
                    <h1 className="hero-title">Deploy a <span style={{ fontStyle: "italic" }}>Stunning</span> Portfolio in Minutes</h1>
                    <span className="hero-subtitle">No code, no design stress, customized for you.</span>
                    <Button label="Start Free" size="large" rounded onClick={() => navigate('/login')} />
                </div>
            </section>

            <section id="how-it-works">
                <h2>How It Works</h2>
                <div className="how-it-works-fieldsets">
                    <div>
                        <Fieldset legend="1. Add Your Info">
                            <p>
                                Fill out your experiences, education, projects, and skills.
                            </p>
                        </Fieldset>
                    </div>
                    <div>
                        <Fieldset legend="2. Customize Your Template">
                            <p>
                                Customize and choose from a variety of templates to match your vision.
                            </p>
                        </Fieldset>
                    </div>
                    <div>
                        <Fieldset legend="3. Choose a Domain & Publish">
                            <p>
                                Select a custom upstack.cv domain and publish your portfolio to the world!
                            </p>
                        </Fieldset>
                    </div>
                </div>
            </section>

            <section id="demos">
                <h2>Demos</h2>
                <div>
                    <Carousel circular value={demos} responsiveOptions={responsiveOptions} itemTemplate={demoTemplate} />
                </div>
            </section>

            <section id="plans">
                <h2>Plans & Pricing</h2>
                <div>
                    <DataTable value={features} showGridlines tableStyle={{ minWidth: '50rem' }}>
                        <Column field="feature" style={{ width: '30%' }} />
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