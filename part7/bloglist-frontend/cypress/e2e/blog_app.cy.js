describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    localStorage.clear()

    const user = {
      name: 'Test user',
      username: 'testuser',
      password: 'wookie',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    const user2 = {
      name: 'Test user2',
      username: 'testuser2',
      password: 'wookie2',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user2)

    cy.request('POST', 'http://localhost:3003/api/login', {
      username: 'testuser2',
      password: 'wookie2',
    }).then((response) => {
      localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
      cy.request({
        url: 'http://localhost:3003/api/blogs',
        method: 'POST',
        body: {
          author: 'Someone',
          title: 'Yahoo',
          url: 'https://www.yahoo.be',
          likes: 3,
        },
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('loggedNoteappUser')).token
          }`,
        },
      })
      cy.request({
        url: 'http://localhost:3003/api/blogs',
        method: 'POST',
        body: {
          author: 'Someone else',
          title: 'AltaVista',
          url: 'https://www.altavista.be',
          likes: 6,
        },
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('loggedNoteappUser')).token
          }`,
        },
      })
    })

    localStorage.clear()

    cy.request('POST', 'http://localhost:3003/api/login', {
      username: 'testuser',
      password: 'wookie',
    }).then((response) => {
      localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
      cy.request({
        url: 'http://localhost:3003/api/blogs',
        method: 'POST',
        body: {
          author: 'nobody',
          title: 'New search engine',
          url: 'https://www.google.be',
          likes: 2,
        },
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('loggedNoteappUser')).token
          }`,
        },
      })
    })
    cy.visit('http://localhost:3000')
  })

  describe('login form is shown1', function () {
    it('Login form is shown2', function () {
      localStorage.clear()
      cy.visit('http://localhost:3000')
      cy.get('#username')
      cy.get('#password')
      cy.get('#loginbutton')
    })
  })
  describe('Login', function () {
    describe('Login correct', function () {
      it('succeeds with correct credentials', function () {
        localStorage.clear()
        cy.visit('http://localhost:3000')
        cy.get('#username').type('testuser')
        cy.get('#password').type('wookie')
        cy.get('#loginbutton').click()
        cy.contains('testuser is logged in')
      })
    })
    describe('Login fault', function () {
      it('fails with wrong credentials', function () {
        localStorage.clear()
        cy.visit('http://localhost:3000')
        cy.get('#username').type('testuser1')
        cy.get('#password').type('wookie1')
        cy.get('#loginbutton').click()
        cy.get('.error').contains('login failed, check your username/password')
        cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      })
    })
  }) //END LOGIN

  describe('When logged in', function () {
    beforeEach(function () {
      localStorage.clear()
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'testuser',
        password: 'wookie',
      }).then((response) => {
        localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
        cy.request({
          url: 'http://localhost:3003/api/blogs',
          method: 'POST',
          body: {
            author: 'everybody',
            title: 'google',
            url: 'https://www.google.be',
          },
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('loggedNoteappUser')).token
            }`,
          },
        })
      })
      cy.visit('http://localhost:3000')
    })

    it('a new blog can be created', function () {
      cy.contains('New blog')
        .click()
        .then((response) => {
          console.log(response)
          cy.get('#title').type('a blog created by cypress')
          cy.get('#author').type('Full Stack is foo')
          cy.get('#url').type('https://fullstackopen.com')

          cy.get('#create')
            .click()
            .then(() => {
              cy.contains('a blog created by cypress')
            })
        })
    })

    it('we can like a blog', function () {
      cy.contains('AltaVista')
      cy.contains('Show').click()
      cy.get('#bntLike').click()
      cy.visit('http://localhost:3000')
      cy.contains('AltaVista')
      cy.contains('Show').click()
      cy.contains('7')
    })
    it('Remove a blog that you have created', function () {
      cy.visit('http://localhost:3000')
      cy.get('#deleteBtn')
      cy.get('button').then((buttons) => {
        console.log('number of buttons', buttons.length)
        cy.wrap(buttons[12]).click()
        cy.visit('http://localhost:3000')
        cy.get('#deleteBtn')
        cy.get('#root').should('not.contain', 'New search engine')
      })
    })

    it("you can not remove a blog that you did't create", function () {
      cy.get('#deleteBtn').should('have.css', 'visibility', 'hidden')
    })

    it('Check if blogs are ordened on number of likes', function () {
      cy.visit('http://localhost:3000')
      cy.get('#deleteBtn')
      cy.get('.blog').eq(1).should('contain', 'Yahoo')
      cy.get('.blog').eq(0).should('contain', 'AltaVista')
      cy.contains('[class=blog]', 'Yahoo').contains('Show').click()
      cy.contains('[class=blog]', 'Yahoo').contains('Like').click()
      cy.visit('http://localhost:3000')
      cy.get('#deleteBtn')
      cy.contains('[class=blog]', 'Yahoo').contains('Show').click()
      cy.contains('[class=blog]', 'Yahoo').contains('Like').click()
      cy.visit('http://localhost:3000')
      cy.get('#deleteBtn')
      cy.contains('[class=blog]', 'Yahoo').contains('Show').click()
      cy.contains('[class=blog]', 'Yahoo').contains('Like').click()
      cy.visit('http://localhost:3000')
      cy.get('#deleteBtn')
      cy.contains('[class=blog]', 'Yahoo').contains('Show').click()
      cy.contains('[class=blog]', 'Yahoo').contains('Like').click()
      cy.visit('http://localhost:3000')
      cy.get('#deleteBtn')
      cy.contains('[class=blog]', 'Yahoo').contains('Show').click()
      cy.contains('[class=blog]', 'Yahoo').contains('Like').click()
      cy.visit('http://localhost:3000')
      cy.get('#deleteBtn')
      cy.contains('[class=blog]', 'Yahoo').contains('Show').click()
      cy.contains('[class=blog]', 'Yahoo').contains('Like').click()
      cy.visit('http://localhost:3000')
      cy.get('#deleteBtn')
      cy.get('.blog').eq(0).should('contain', 'Yahoo')
      cy.get('.blog').eq(1).should('contain', 'AltaVista')
    })
  })
})
