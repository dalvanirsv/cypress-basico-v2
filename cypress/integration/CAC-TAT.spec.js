describe("central de Atendimento ao Cliente TAT", function () {
  beforeEach(function () {
    cy.visit("./src/index.html");
  });

  it("verifica o título da aplicação", function () {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("preencha os campos obrigatórios e envia o formulário", function () {
    const longTest =
      "teste, teste, teste, teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste";
    cy.clock();
    cy.get("#firstName").type("dalvanir");
    cy.get("#lastName").type("vieira");
    cy.get("#email").type("dalvanir@dalvanir.com");
    cy.get("#open-text-area").type(longTest, { delay: 0 });
    cy.contains("button", "Enviar").click();
    cy.get(".success").should("be.visible");
    cy.tick(3000);
    cy.get(".success").should("not.be.visible");
  });

  it("exibe mensagem de erro ao submeter o formulário com um email com  formação", function () {
    cy.get("#firstName").type("dalvanir");
    cy.get("#lastName").type("vieira");
    cy.get("#email").type("dalvanir@dalvanir");
    cy.get("#open-text-area").type("test");
    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
  });

  it("Campo telefone continua vazio quando preenchido com valor não-numérico", function () {
    cy.get("#phone").type("fsdkfmkdsf").should("have.value", "");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", function () {
    cy.get("#firstName").type("dalvanir");
    cy.get("#lastName").type("vieira");
    cy.get("#email").type("dalvanir@dalvanir.com");
    cy.get("#phone-checkbox").click();
    cy.get("#open-text-area").type("test");
    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
  });

  it("preencha e limpa os campos nome, sobrenome, email e telefone", function () {
    cy.get("#firstName")
      .type("dalvanir")
      .should("have.value", "dalvanir")
      .clear()
      .should("have.value", "");
    cy.get("#lastName")
      .type("vieira")
      .should("have.value", "vieira")
      .clear()
      .should("have.value", "");
    cy.get("#email")
      .type("dalvanir@dalvanir.com")
      .should("have.value", "dalvanir@dalvanir.com")
      .clear()
      .should("have.value", "");
    cy.get("#open-text-area")
      .type("teste")
      .should("have.value", "teste")
      .clear()
      .should("have.value", "");
  });

  it("validar mensagem de erro ao não digitar os campos obrigatórios", function () {
    cy.get('button[type="submit"]').click();

    cy.get(".error").should("be.visible");
  });

  it("envia um formulário com sucesso usando um comando customizado", function () {
    cy.fillMandatoryFieldsAndSubmit();

    cy.get(".success").should("be.visible");
  });

  it('seleciona um produto "youtube" por seu texto', function () {
    cy.get("#product").select("YouTube");
  });

  it('seleciona um produto "Mentoria" por seu Valor (value)', function () {
    cy.get("#product").select("mentoria").should("have.value", "mentoria");
  });

  it('seleciona um produto "Blog" por seu Indice', function () {
    cy.get("#product").select("Cursos").should("have.value", "cursos");
  });

  it('Marca um tipo de atendimento "feedback"', function () {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should("have.value", "feedback");
  });

  it("Marca cada tipo de atendimento ", function () {
    cy.get('input[type="radio"]')
      .should("have.length", 3)
      .each(function ($radio) {
        cy.wrap($radio).check();
        cy.wrap($radio).should("be.checked");
      });
  });
  it("Marca ambos os checkbox, e depois desmarca o último ", function () {
    cy.get('input[type="checkbox"]')
      .check()
      .last()
      .uncheck()
      .should("not.be.checked");
  });

  it("Seleciona um arquivo da pasta fixtures", function () {
    cy.get('input[type="file"]#file-upload')
      .should("not.have.value")

      .selectFile("./cypress/fixtures/example.json")
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });
  it("Seleciona um arquivo simulando um drag-and-drog", function () {
    cy.get('input[type="file"]#file-upload')
      .should("not.have.value")
      .selectFile("./cypress/fixtures/example.json", { action: "drag-drop" })
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });
  it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", function () {
    cy.get("#privacy a").should("have.attr", "target", "_blank");
  });

  it("Acessa a página da política de privacidade removendo o o target e então clicando no link", function () {
    cy.get("#privacy a").invoke("removeAttr", "target").click();

    cy.contains("Talking About Testing").should("be.visible");
  });

  it.only("exibe e esconde as mensagens de sucesso e erro usando o .invoke", () => {
    cy.get(".success")
      .should("not.be.visible")
      .invoke("show")
      .should("be.visible")
      .and("contain", "Mensagem enviada com sucesso.")
      .invoke("hide")
      .should("not.be.visible");
    cy.get(".error")
      .should("not.be.visible")
      .invoke("show")
      .should("be.visible")
      .and("contain", "Valide os campos obrigatórios!")
      .invoke("hide")
      .should("not.be.visible");
  });
});
