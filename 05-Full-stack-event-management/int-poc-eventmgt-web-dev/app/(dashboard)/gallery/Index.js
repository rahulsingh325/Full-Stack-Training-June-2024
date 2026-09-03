"use client";

import { useEffect, useState, useCallback } from "react";
import { Container } from "react-bootstrap";
import api from "@/helper/api";
import GalleryToolbar from "@/components/gallery/GalleryToolbar";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import PaginationFooter from "@/components/pagination/PaginationFooter";
import usePagination from "@/hooks/usePagination";
import useDebounce from "@/hooks/useDebounce";
import { toast } from "react-toastify";
import { galleryDateAdapter } from "@/utils/dateAdapters";

export default function GalleryPage() {
    /* =========================
       DATA STATES
    ========================= */
    const [galleries, setGalleries] = useState([]);
    const [events, setEvents] = useState([]);
    const [initialLoading, setInitialLoading] = useState(true);
    const [isFetching, setIsFetching] = useState(false);

    /* =========================
       FILTER STATES
    ========================= */
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    // SINGLE SOURCE OF TRUTH (UI KEY)
    const [dateKey, setDateKey] = useState("this_week"); // all | this_week | this_month | custom
    const [range, setRange] = useState(null);

    /* =========================
       DEBOUNCED VALUES
    ========================= */
    const debouncedSearch = useDebounce(search, 400);
    const debouncedCategory = useDebounce(category, 400);

    /* =========================
       PAGINATION
    ========================= */
    const [totalItemsFromAPI, setTotalItemsFromAPI] = useState(0);

    const {
        page,
        pageSize,
        totalPages,
        goToPage,
        changePageSize,
    } = usePagination({
        totalItems: totalItemsFromAPI,
        initialPageSize: 12,
    });

    const categoryOptions = [
        { label: "All Category", value: "" },
        ...Array.from(
            new Set(
                events.map((e) => e.category_name).filter(Boolean)
            )
        ).map((cat) => ({
            label: cat,
            value: cat,
        })),
    ];


    /* =========================
       RESET PAGE ON FILTER CHANGE
    ========================= */
    useEffect(() => {
        if (dateKey === "custom" && (!range?.from || !range?.to)) {
            return;
        }
        goToPage(1);
    }, [
        debouncedSearch,
        debouncedCategory,
        dateKey,
        range?.from,
        range?.to,
    ]);

    /* =========================
       FETCH GALLERIES
    ========================= */
    const fetchGalleries = useCallback(async () => {
        try {
            if (galleries.length === 0) {
                setInitialLoading(true);
            } else {
                setIsFetching(true);
            }

            const dateParams = galleryDateAdapter({
                key: dateKey,
                range,
            });

            // custom selected but dates not picked yet
            if (!dateParams) return;

            const params = {
                limit: pageSize,
                offset: (page - 1) * pageSize,
                ...dateParams,
            };

            if (debouncedSearch) params.search = debouncedSearch;
            if (debouncedCategory) params.category_name = debouncedCategory;

            const res = await api.get("/galleries/list", { params });

            const rawItems = res.data?.items ?? [];

            setGalleries(
                rawItems.map((g) => ({
                    ...g,
                    gallery_id: g.gallery_id || g.id,
                }))
            );

            setTotalItemsFromAPI(res.data?.total ?? 0);
        } catch (err) {
            console.error("Failed to fetch galleries", err);
            setGalleries([]);
            setTotalItemsFromAPI(0);
        } finally {
            setInitialLoading(false);
            setIsFetching(false);
        }
    }, [
        page,
        pageSize,
        debouncedSearch,
        debouncedCategory,
        dateKey,
        range?.from,
        range?.to,
        galleries.length,
    ]);

    /* =========================
       EFFECT (SAFE)
    ========================= */
    useEffect(() => {
        if (dateKey === "custom" && (!range?.from || !range?.to)) {
            return;
        }
        fetchGalleries();
    }, [fetchGalleries, dateKey, range?.from, range?.to]);

    /* =========================
       FETCH EVENTS (CREATE MODAL)
    ========================= */
    useEffect(() => {
        api
            .get("/events/all_events_list", {
                params: { limit: 50, offset: 0 },
            })
            .then((res) => setEvents(res.data?.items ?? []));
    }, []);

    /* =========================
       CREATE / DELETE
    ========================= */
    const handleCreateGallery = async (payload) => {
        try {
            await api.post("/galleries/create", payload);
            toast.success("Gallery created");
            fetchGalleries();
        } catch {
            toast.error("Gallery create failed");
        }
    };

    const handleGalleryDeleted = (galleryId) => {
        setGalleries((prev) =>
            prev.filter((g) => g.gallery_id !== galleryId)
        );
        setTotalItemsFromAPI((prev) => Math.max(prev - 1, 0));
    };

    /* =========================
       UI
    ========================= */
    return (
        <>
            {/* <Header title="Gallery" breadcrumb="Dashboard / Gallery" /> */}

            <Container fluid className="bg-grey-20 rounded-4 p-4">
                <GalleryToolbar
                    events={events}
                    categoryOptions={categoryOptions}
                    search={search}
                    setSearch={setSearch}
                    category={category}
                    setCategory={setCategory}
                    dateKey={dateKey}
                    setDateKey={setDateKey}
                    range={range}
                    setRange={setRange}
                    onCreate={handleCreateGallery}
                />

                {isFetching && (
                    <div className="text-muted small mb-2">
                        Updating results…
                    </div>
                )}

                <GalleryGrid
                    galleries={galleries}
                    loading={initialLoading}
                    onDeleted={handleGalleryDeleted}
                />

                <PaginationFooter
                    page={page}
                    totalPages={totalPages}
                    totalItems={totalItemsFromAPI}
                    pageSize={pageSize}
                    pageSizeOptions={[6, 12, 24, 48]}
                    onPageChange={goToPage}
                    onPageSizeChange={changePageSize}
                />
            </Container>
        </>
    );
}
