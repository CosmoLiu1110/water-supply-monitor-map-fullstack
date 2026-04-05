import "./introduction.css"
const Background = () => {
    return (
        <div>
            <div className="Title">
                <h1>Project Background</h1><br />
                <h2>Inspiration</h2>
                <p><strong>Our project is inspired by United Nation's Sustainable Development Goal number 6: Clean water and Sanitation.</strong></p>
            </div>
            <div className="cards-container">
                <div className="Card">
                    <h2>Why clean water and sanitation?</h2>
                    <p>According to UN-Water (2018), agriculture is by far the largest water consumer, accounting for nearly 70 per cent of all withdrawals globally and as much as 90 per cent in some arid countries. Saving just a fraction of this can significantly alleviate water stress in other sectors. Realistically, achieving this would allow governments to reallocate economic resources towards improving infrastructure, education, and healthcare. </p><br />
                </div>
                <div className="Card">
                    <h2>Problem Statement</h2>
                    <p>Access to clean water is a fundamental human right, yet many communities around the world still lack reliable access to safe and clean water sources.</p>
                    <p>In rural areas, water pumps are often the primary source of water for households and agriculture. However, these pumps can be prone to breakdowns and malfunctions, leading to disruptions in water supply and potential health risks.</p>
                    <p>Furthermore, the lack of real-time monitoring and maintenance of water pumps can lead to inefficiencies in water usage and increased costs for communities.</p><br />
                </div>
                <div className="Card">
                    <h2>Project Aim</h2>
                    <p>Our Project's aim is to develop a web application to track the locations and conditions of water pumps across the UK. </p>
                    <p>This is to help monitor water supply and ensure that farmers have access to clean and safe water.</p><br />
                </div>
            </div>
        </div>
    );
};

export default Background;