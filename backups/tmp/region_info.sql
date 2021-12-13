--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 13.3

-- Started on 2021-12-13 17:46:05

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 201 (class 1259 OID 107136)
-- Name: region_info; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.region_info (
    code character varying(2) NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.region_info OWNER TO postgres;

--
-- TOC entry 2984 (class 0 OID 107136)
-- Dependencies: 201
-- Data for Name: region_info; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.region_info (code, name) FROM stdin;
01	Алтайский край
03	Краснодарский край
04	Красноярский край
05	Приморский край
07	Ставропольский край
08	Хабаровский край
10	Амурская область
11	Архангельская область
12	Астраханская область
14	Белгородская область
15	Брянская область
17	Владимирская область
18	Волгоградская область
19	Вологодская область
20	Воронежская область
22	Нижегородская область
24	Ивановская область
25	Иркутская область
26	Республика Ингушетия
27	Калининградская область
28	Тверская область
29	Калужская область
30	Камчатский край
32	Кемеровская область - Кузбасс
33	Кировская область
34	Костромская область
35	Республика Крым
36	Самарская область
37	Курганская область
38	Курская область
40	Город Санкт-Петербург город федерального значения
41	Ленинградская область
42	Липецкая область
44	Магаданская область
45	Город Москва столица Российской Федерации город федерального значения
46	Московская область
47	Мурманская область
49	Новгородская область
50	Новосибирская область
52	Омская область
53	Оренбургская область
54	Орловская область
56	Пензенская область
57	Пермский край
58	Псковская область
60	Ростовская область
61	Рязанская область
63	Саратовская область
64	Сахалинская область
65	Свердловская область
66	Смоленская область
67	Город федерального значения Севастополь
68	Тамбовская область
69	Томская область
70	Тульская область
71	Тюменская область
73	Ульяновская область
75	Челябинская область
76	Забайкальский край
77	Чукотский автономный округ
78	Ярославская область
79	Республика Адыгея (Адыгея)
80	Республика Башкортостан
81	Республика Бурятия
82	Республика Дагестан
83	Кабардино-Балкарская Республика
84	Республика Алтай
85	Республика Калмыкия
86	Республика Карелия
87	Республика Коми
88	Республика Марий Эл
89	Республика Мордовия
90	Республика Северная Осетия-Алания
91	Карачаево-Черкесская Республика
92	Республика Татарстан (Татарстан)
93	Республика Тыва
94	Удмуртская Республика
95	Республика Хакасия
96	Чеченская Республика
97	Чувашская Республика - Чувашия
98	Республика Саха (Якутия)
99	Еврейская автономная область
\.


--
-- TOC entry 2853 (class 2606 OID 107145)
-- Name: region_info region_info_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.region_info
    ADD CONSTRAINT region_info_pkey PRIMARY KEY (code);


-- Completed on 2021-12-13 17:46:05

--
-- PostgreSQL database dump complete
--

