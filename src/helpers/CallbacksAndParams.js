export default class CallbacksAndParams{
  constructor(params, handleSuccessCallback, handleFailureCallback){
    this.params = params;
    this.handleSuccessCallback = handleSuccessCallback;
    this.handleFailureCallback = handleFailureCallback;
  }
}