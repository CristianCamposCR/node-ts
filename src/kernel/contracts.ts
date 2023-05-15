export interface UseCase<TInput, TOutput> {
    execute(payload?: TInput): Promise<TOutput>;
}