const axios = require("axios").default;
const cheerio = require("cheerio");

const url = "https://astu.ac.in/?page_id=116";

// Function to scrape product data
async function scrapeLinks() {
    try {
        // Send HTTP request and get response
        const response = await axios.get(url);

        // Load HTML content into Cheerio
        const $ = cheerio.load(response.data);
        const data = $(".box-frame-in pre a");

        const dataArr = [];

        // Extract data 
        data.each((_, element) => {
            const name = $(element).text().trim();
            const link = $(element).attr("href");

            // Check if AEC & MCA keywords are present or not
            if(name.includes("AEC") && name.includes("MCA"))
                dataArr.push({ name, link });
        });

        // console.log("Scraped data:", dataArr, "Length: ", dataArr.length);
        return dataArr;
    } catch (error) {
        console.error("Error during scraping:", error);
    }
}

module.exports = scrapeLinks;