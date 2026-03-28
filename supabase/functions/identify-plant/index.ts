import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS });
  }

  try {
    const { imageBase64, mediaType, apiKey } = await req.json();

    if (!imageBase64 || !apiKey) {
      return new Response(JSON.stringify({ error: "缺少参数" }), {
        headers: { ...CORS, "Content-Type": "application/json" },
      });
    }

    // 把 base64 转成二进制
    const byteStr = atob(imageBase64);
    const arr = new Uint8Array(byteStr.length);
    for (let i = 0; i < byteStr.length; i++) arr[i] = byteStr.charCodeAt(i);
    const blob = new Blob([arr], { type: mediaType || "image/jpeg" });

    const formData = new FormData();
    formData.append("images", blob, "plant.jpg");
    formData.append("organs", "auto");

    const resp = await fetch(
      `https://my-api.plantnet.org/v2/identify/all?api-key=${apiKey}&lang=zh&nb-results=1`,
      { method: "POST", body: formData }
    );

    const data = await resp.json();
    return new Response(JSON.stringify({ status: resp.status, ...data }), {
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  }
});
