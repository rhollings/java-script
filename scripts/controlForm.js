/*
The MyForm component is set up with an empty form with a submit handler. The submit handler will be called when the form is submitted.

We've added a button which submits the form. You can see it has the type set to submit indicating it is the button controlling the form.
Add the input element in the form and set its value and onChange() attributes like the last challenge.
You should then complete the handleSubmit method so that it sets the component state property submit to the current input value in the local state.

You also must call event.preventDefault() in the submit handler, to prevent the default form submit behavior which will refresh the web page.
For camper convenience, the default behavior has been disabled here to prevent refreshes from resetting challenge code.

Finally, an h1 tag after the form which renders the submit value from the component's state.
You can then type in the form and click the button (or press enter), and you should see your input rendered to the page.
*/
