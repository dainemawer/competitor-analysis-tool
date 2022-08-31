const handler = async (req, res) => {
    const { url } = req.query;

    function setUpQuery(url) {
        return `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${process.env.PAGESPEED_INSIGHTS_API_KEY}&strategy=mobile`;
    }

    const response = await fetch(setUpQuery(url));
    const data = await response.json();

    res.status(200).json(data);

}

export default handler;
