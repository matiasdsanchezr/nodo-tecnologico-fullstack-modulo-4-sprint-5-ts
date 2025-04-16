import { useState, useEffect, useMemo, useCallback } from "react";
import axios, { AxiosError, CanceledError } from "axios";

export interface Country {
  id: string;
  createdAt: string;
  name: string;
  image: string;
  countryCode: string;
  latitude: number;
  longitude: number;
}

export interface PaginationInfo {
  currentPage: number;
  count: number;
  pages: number;
}

export interface CountriesFilter {
  name?: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
}

export interface ErrorResponse {
  status?: number;
  message: string;
}

const API_BASE_URL = "https://67fce7181f8b41c8168804f6.mockapi.io/";

export const useCountriesApi = (
  initialPage = 1,
  initialFilter?: CountriesFilter
) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filters, setFilters] = useState<CountriesFilter>(initialFilter ?? {});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorResponse>();
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
    currentPage: initialPage,
    count: 0,
    pages: 0,
  });

  const fetchCountries = useCallback(
    async (abortSignal?: AbortSignal) => {
      try {
        setLoading(true);
        setError(undefined);

        const requestUrl = `${API_BASE_URL}/countries`;
        const response = await axios.get<Country[]>(requestUrl, {
          signal: abortSignal,
        });
        let countries = response.data;

        countries = countries.filter(
          (country) =>
            !filters.name ||
            country.name.toLowerCase().includes(filters.name.toLowerCase())
        );

        const pages = Math.ceil(countries.length / 10);
        const currentPage = Math.min(
          Math.max(paginationInfo.currentPage, 1),
          pages
        );
        const paginatedCountries = countries.slice(
          (currentPage - 1) * 10,
          (currentPage - 1) * 10 + 10
        );

        setCountries(paginatedCountries);
        setPaginationInfo(() => ({
          currentPage,
          count: countries.length,
          pages,
        }));
        setLoading(false);
      } catch (err) {
        if (err instanceof CanceledError) {
          console.log("Request canceled:", err.message);
          setCountries([]);
          return;
        }

        const axiosError = err as AxiosError;
        setError({
          status: axiosError.response?.status ?? 500,
          message: axiosError.message || "An unknown error occurred",
        });
        setCountries([]);
      }

      setLoading(false);
    },
    [filters]
  );

  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= paginationInfo.pages) {
        setPaginationInfo((prev) => ({ ...prev, currentPage: page }));
      }
    },
    [paginationInfo]
  );

  const goToNextPage = useCallback(() => {
    if (paginationInfo.currentPage < paginationInfo.pages) {
      setPaginationInfo((prev) => ({
        ...prev,
        currentPage: prev.currentPage + 1,
      }));
    }
  }, [paginationInfo.currentPage, paginationInfo.pages]);

  const goToPrevPage = useCallback(() => {
    if (paginationInfo.currentPage > 1) {
      console.log("asdasdads");
      setPaginationInfo((prev) => ({
        ...prev,
        currentPage: prev.currentPage - 1,
      }));
    }
  }, [paginationInfo.currentPage, paginationInfo.pages]);

  const filterCountries = useCallback((name: string) => {
    setPaginationInfo((prev) => ({ ...prev, currentPage: 1 }));
    setFilters({ name });
  }, []);

  const clearFilters = useCallback(() => {
    setPaginationInfo((prev) => ({ ...prev, currentPage: 1 }));
    setFilters({});
  }, []);

  const deleteCountry = useCallback(
    async (id: number) => {
      setLoading(true);
      await axios.delete(`${API_BASE_URL}/countries/${id}`).catch((e) => {
        console.error(e);
      });
      fetchCountries();
    },
    [setLoading, fetchCountries]
  );

  useEffect(() => {
    const abortController = new AbortController();
    void fetchCountries(abortController.signal);

    return () => {
      abortController.abort();
    };
  }, [paginationInfo.currentPage, filters, fetchCountries]);

  return useMemo(() => {
    return {
      countries,
      paginationInfo,
      loading,
      error,
      filters,
      filterCountries,
      deleteCountry,
      clearFilters,
      goToNextPage,
      goToPrevPage,
      goToPage,
    };
  }, [
    countries,
    paginationInfo,
    loading,
    error,
    filters,
    filterCountries,
    deleteCountry,
    clearFilters,
    goToNextPage,
    goToPrevPage,
    goToPage,
  ]);
};
