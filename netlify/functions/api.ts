import type { Config } from "@netlify/functions"; // импортируем тип Config
import { createClient } from "@supabase/supabase-js"; // импрортируем супербазу

const corsHeaders = { // CORS
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"};

const supabase = createClient(process.env.SUPABASE_URL!,process.env.SUPABASE_KEY!); //вошли в базу даных


export default async (req: Request) => { // главная функция

    const url = new URL(req.url); // для работы с url 

    // Ответ на предварительный CORS-запрос, чтобы сайт получил данные и бекенд не послал
    if (req.method === "OPTIONS") {
        return new Response(null, {
            status: 204, headers: corsHeaders
        });
    }

    // === /api/events/approved
    if (req.method === "GET" && url.pathname === "/api/events/approved") { // для сайта пользователя, без входа

        const { data, error } = await supabase
            .from("events")
            .select("*")
            .eq("status", "approved"); // оставить только approved

        if (error) {return Response.json({error: error.message},{status: 500, headers: corsHeaders});}

        return Response.json(data, {headers: corsHeaders}); // Возвращаем мероприятия
    }

    // ВХОД В АККАУНТ АДМИНА
    const auth = req.headers.get("authorization");

    if (!auth || !auth.startsWith("Bearer ")) {
        return Response.json(
            {dopizza: "Ни один человек не может долго быть двуликим, иметь одно лицо для себя, а другое для остальных, в конце концов он сам перестанет понимать, какое из них подлинное"},
            {status: 401, headers: corsHeaders}
        );
    }

    const token = auth.replace("Bearer ", ""); // после bearer идёт токен

    const { data: { user }, error } = await supabase.auth.getUser(token); // отдаём токен на проверку

    if (error || !user) {return Response.json({dopizza: "Ни один человек не может долго быть двуликим, иметь одно лицо для себя, а другое для остальных, в конце концов он сам перестанет понимать, какое из них подлинное"},{status: 401, headers: corsHeaders});}

    // === /api/events
    // только для авторизованных
    if (req.method === "GET" && url.pathname === "/api/events") {

        const { data, error } = await supabase
            .from("events") // таблица в супербазе называется "events"
            .select("*"); // получаем все столбцы всех записей

        if (error) {return Response.json({error: error.message},{status: 500, headers: corsHeaders});}

        return Response.json(data, {headers: corsHeaders}); // Возвращаем мероприятия
    }



    // Создаём новое мероприятие
    if (req.method === "POST" && url.pathname === "/api/events") {

        // Получаем JSON из тела запроса
        const body = await req.json();

        // Добавляем мероприятие в Supabase
        const { data, error } = await supabase //не забывать везде редачить это, когда меняю базу данных
            .from("events")
            .insert({
                title: body.title,
                status: body.status,
                description: body.description,
                start_date: body.start_date,
                end_date: body.end_date,
                image_url: body.image_url,
                price: body.price,
                source_url: body.source_url,
                "18+": body["18+"],
                broadcaster: body.broadcaster
            })
            .select() // сохранить для отправки сохранённого мероприятия 
            .single(); // только одна запись без массива

        // Если Supabase вернул ошибку
        if (error) {return Response.json({error: error.message},{status: 500, headers: corsHeaders});}

        // Возвращаем созданное мероприятие
        return Response.json(data, {status: 201, headers: corsHeaders});
    }


    // === /api/events/:id
    // изменить определённое мероприятие 
    if (req.method === "PUT" && url.pathname.startsWith("/api/events/")) { // startsWith("/api/events/ НАЧИНАЕТСЯ С АККУРАТНО

        const id = Number(url.pathname.split("/").pop()); // вытаскиваем id 

        const body = await req.json(); // ждём данные для изменений 

        const { data, error } = await supabase // изменяем старые 
            .from("events")
            .update({
                title: body.title,
                status: body.status,
                description: body.description,
                start_date: body.start_date,
                end_date: body.end_date,
                image_url: body.image_url,
                price: body.price,
                source_url: body.source_url,
                "18+": body["18+"],
                broadcaster: body.broadcaster
            })
            .eq("id", id) // только именно этот id 
            .select()
            .single();

        if (error) {return Response.json({error: error.message},{status: 500, headers: corsHeaders});}
    

        return Response.json(data, {headers: corsHeaders});
    }
    

    // === /api/events/:id
    // удалить определённое мероприятие
    if (req.method === "DELETE" && url.pathname.startsWith("/api/events/")) {

        const id = Number(url.pathname.split("/").pop()); // вытаскиваем id

        const { data, error } = await supabase
            .from("events")
            .delete() // удаляем
            .eq("id", id) // удаляем только этот id
            .select()
            .single();

        if (error) {return Response.json({error: error.message},{status: 500, headers: corsHeaders});}

        return Response.json(data, {headers: corsHeaders});
    }


    // Если маршрут не подошёл
    return Response.json({dopizza: "Ни один человек не может долго быть двуликим, иметь одно лицо для себя, а другое для остальных, в конце концов он сам перестанет понимать, какое из них подлинное"}, {headers: corsHeaders});


};

// Настройки для Netlify
export const config: Config = {path: "/api/*"};
