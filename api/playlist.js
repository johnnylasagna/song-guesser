export default async function handler(req, res) {
    const { playlistId } = req.query;

    const apiKey = process.env.YOUTUBE_API_KEY;
    const hasValidApiKey = apiKey && apiKey !== "your_key";

    if (!playlistId || typeof playlistId !== "string") {
        return res.status(400).json({
            error: "playlistId is required",
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
                `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&pageToken=${nextPageToken}&playlistId=${playlistId}&key=${apiKey}`
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