function extractPlaylistId(input) {
    try {
        if (!input.includes("list=")) {
            throw new Error("Input does not contain 'list=' parameter, treating as playlist ID");
        }
        const url = new URL(input);
        return url.searchParams.get("list");
    } catch {
        // console.log("Input is not a valid URL, treating as playlist ID:", input);
        return /^[a-zA-Z0-9_-]+$/.test(input)
            ? input
            : null;
    }
}

export default async function handler(req, res) {
    const { playlistId } = req.query;

    const apiKey = process.env.YOUTUBE_API_KEY;
    const hasValidApiKey = apiKey && apiKey !== "your_key";

    // console.log("Received playlistId:", playlistId);
    
    const playlistIdExtracted = extractPlaylistId(playlistId);

    // console.log(playlistIdExtracted);

    if (!playlistIdExtracted || typeof playlistIdExtracted !== "string") {
        return res.status(400).json({
            error: "Invalid playlist id or url",
        });
    }

    if (!hasValidApiKey) {
        return res.status(500).json({
            error: "Set a real YOUTUBE_API_KEY in .env before running the API",
        });
    }


    try {
        let videos = [];
        let nextPageToken = "";

        do {
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&pageToken=${nextPageToken}&playlistId=${playlistIdExtracted}&key=${apiKey}`
            );

            const data = await response.json();

            if (!response.ok) {
                return res.status(response.status).json({
                    error:
                        data?.error?.message || "Failed to fetch playlist",
                });
            }

            const currentVideos = (data.items ?? [])
                .filter(
                    (item) =>
                        item?.snippet?.resourceId?.videoId
                )
                .map((item) => ({
                    title:
                        item.snippet?.title || "Unknown Title",

                    videoId:
                        item.snippet.resourceId.videoId,

                    thumbnail:
                        item.snippet?.thumbnails?.medium?.url ||
                        item.snippet?.thumbnails?.default?.url ||
                        "",
                }));

            videos = [...videos, ...currentVideos];

            nextPageToken = data.nextPageToken || "";

        } while (nextPageToken);

        return res.status(200).json(videos);

    } catch (err) {
        console.error("Error fetching playlist:", err);

        return res.status(500).json({
            error: "Failed to fetch playlist",
        });
    }
}