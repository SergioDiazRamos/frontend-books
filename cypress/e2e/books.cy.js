describe('Books', () => {
  it('Linst & CRUD Books', () => {
    // List Books
    cy.visit('/').get('[data-cy="link-to-books"]').click();

    // Create Books
    cy.get('[href="/libros/crear"]')
      .click()
      .get('[data-cy="input-book-title"]')
      .type('Nuevo Libro de Cypress')
      .get('[data-cy="button-submit-book"]')
      .click()
      .get('[data-cy="book-list"]')
      .contains('Nuevo Libro de Cypress');

    // Show Book
    cy.get('[data-cy^=link-to-visit-book-]')
      .last()
      .click()
      .get('h1')
      .should('contain.text', 'Nuevo Libro de Cypress')
      .get('[href="/libros"]')
      .click();

    // Edit Book
    cy.get('[data-cy^=link-to-edit-book-]')
      .last()
      .click()
      .get('[data-cy="input-book-title"]')
      .clear()
      .type('Libro editado por Cypress')
      .get('[data-cy="button-submit-book"]')
      .click()
      .get('[data-cy="book-list"]')
      .contains('Libro editado por Cypress');

    // Delete Book
    cy.get('[data-cy^=button-to-delete-book-]')
      .last()
      .click()
      .get('[data-cy^=link-to-visit-book-]')
      .last()
      .should('not.contain.text', 'Libro editado por Cypress');
  });
});
