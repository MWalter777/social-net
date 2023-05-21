export interface DataWithPatination<T> {
	data: T[];
	totalPages: number;
	hasPrevious: boolean;
	hasNext: boolean;
	currentPage: number;
	totalElements: number;
}
