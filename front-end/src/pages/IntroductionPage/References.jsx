
const References = () => {
    const Ref = [
        {
            author: "Aldaya, M.M., Hoekstra, A.Y. & Sonnenberg, A.",
            year: 2018,
            title: "The Water Footprint of European Agricultural Imports: Hotspots in the Context of Water Scarcity",
            source: "Resources, 8(3), p. 141",
            link: "https://www.mdpi.com/2079-9276/8/3/141",
            accessDate: "28 October 2025"
        },
        {
            author: "Food and Agriculture Organization of the United Nations",
            year: 2025,
            title: "Integrated Monitoring Initiative for SDG 6",
            source: "",
            link: "https://www.fao.org/in-action/integrated-monitoring-initiative-sdg6/en",
            accessDate: "19 October 2025"
        },
        {
            author: "Foster, T., Furey, S., Banks, B. & Willetts, J.",
            year: 2020,
            title: "Functionality of handpump water supplies: a review of data from sub-Saharan Africa and the Asia-Pacific region",
            source: "International Journal of Water Resources Development, 36(5), pp. 855–869",
            link: "https://www.tandfonline.com/doi/full/10.1080/07900627.2018.1543117",
            accessDate: "1 December 2025"
        },
        {
            author: "Interaction Design Foundation",
            year: 2016,
            title: "5 Stages in the Design Thinking Process",
            source: "",
            link: "https://www.interaction-design.org/literature/article/5-stages-in-the-design-thinking-process",
            accessDate: "29 November 2025"
        },
        {
            author: "Interaction Design Foundation",
            year: 2025,
            title: "What is Design Thinking?",
            source: "",
            link: "https://www.interaction-design.org/literature/topics/design-thinking",
            accessDate: "29 November 2025"
        },
        {
            author: "Jiang, W. & Marggraf, R.",
            year: 2023,
            title: "Can International Freshwater Trade Contribute to the SDG 6?",
            source: "Water, 15(21), p. 3853",
            link: "https://www.mdpi.com/2073-4441/15/21/3853",
            accessDate: "28 October 2025"
        },
        {
            author: "Jiménez, A. & Pérez-Foguet, A.",
            year: 2011,
            title: "The relationship between technology and functionality of rural water points: evidence from Tanzania",
            source: "Water Science and Technology, 63(5), pp. 948–955",
            link: "https://pubmed.ncbi.nlm.nih.gov/21411945/",
            accessDate: "28 October 2025"
        },
        {
            author: "Murray, A.L., Stone, G., Yang, A.R., Lawrence, N.F., Matthews, H. & Kayser, G.L.",
            year: 2024,
            title: "Rural water point functionality estimates and associations: Evidence from nine countries in sub-Saharan Africa and South Asia",
            source: "Water Resources Research, 60(2), e2023WR034679",
            link: "https://agupubs.onlinelibrary.wiley.com/doi/10.1029/2023WR034679",
            accessDate: "1 December 2025"
        },
        {
            author: "Mvongo, D.V., Defo, C. & Tchoffo, M.",
            year: 2023,
            title: "Assessing the functionality of water supply handpumps in a Sub-Saharan Africa rural environment: a practical application in eight councils in the Mvila Division, Southern Cameroon",
            source: "Journal of Water, Sanitation and Hygiene for Development, 13(5), pp. 322–332",
            link: "https://iwaponline.com/washdev/article/13/5/322/94689",
            accessDate: "1 December 2025"
        },
        {
            author: "Schwaber, K. & Sutherland, J.",
            year: 2020,
            title: "The Scrum Guide: The Definitive Guide to Scrum: The Rules of the Game",
            source: "Scrum.org",
            link: "https://scrumguides.org/scrum-guide.html",
            accessDate: "3 December 2025"
        },
        {
            author: "UN-Water",
            year: 2018,
            title: "Sustainable Development Goal 6: Synthesis Report 2018 on Water and Sanitation",
            source: "",
            link: "https://www.sustainabledevelopment.un.org/content/documents/19901SDG6_SR2018_web_3.pdf",
            accessDate: "28 October 2025"
        }
    ];
    return (
        Ref.map((acknowledgement, key) => (
            <div className="Link">
                <div key={key}>
                    <h3><strong>Author Name: {acknowledgement.author}</strong></h3>
                    <p>Year Published: {acknowledgement.year}</p>
                    <p>Title: {acknowledgement.title}</p>
                    <p>Available at: <a href={acknowledgement.link} target="_blank" rel="noopener noreferrer">{acknowledgement.link}</a></p>
                    <p>Access Date: {acknowledgement.accessDate}</p><br />
                </div>
            </div>
        ))
    );
}
export default References;