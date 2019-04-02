function includeHtml(fileName: string): string {
    const response = HtmlService.createHtmlOutputFromFile(fileName);
    return response.getContent();
}

function includeTemplate(fileName: string, parameters: {}): string {
    const response: any = HtmlService.createTemplateFromFile(fileName);

    if (parameters !== undefined) {
        response.parameters = parameters;
    }

    return response.evaluate().getContent();
}
