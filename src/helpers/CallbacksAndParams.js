export default class CallbacksAndParams{
  constructor(params, handleResultsFoundCallback, handleResultsNotFoundCallback){
    this.params = params;
    this.handleResultsFoundCallback = handleResultsFoundCallback;
    this.handleResultsNotFoundCallback = handleResultsNotFoundCallback;
  }
}