// classe que vai conter a logica dos dados

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)

    this.load()
  }

  load() {
    this.entries = [
      {
        login: 'kauednar',
        name: "Kaue Ednar",
        public_repos: '10',
        followers: '2'
        },
      {
        login: 'juanrezende',
        name: "Juan Rezende",
        public_repos: '32',
        followers: '20'
        }
    ]
  }

  delete(user) {
    this.entries = this.entries
    .filter(entry => entry.login !== user.login)
  }
}

// classe que vai criar a visualização e eventos do HTML

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)

    this.tbody = this.root.querySelector('table tbody')
  
    this.update()
  }

  update() { 
    this.removeAllTr()
    
    this.entries.forEach( user => {
      const row = this.createRow()

      row.querySelector('.user img').src = `https://github.com/${user.login}.png`
      row.querySelector('.user img').alt = `Foto de ${user.name}`
      row.querySelector('.user p').textContent = user.name
      row.querySelector('.user span').textContent = user.login
      row.querySelector('.repositories').textContent = user.public_repos
      row.querySelector('.followers').textContent = user.followers

      row.querySelector('.remove').onclick = () => {
        const isOk = confirm('Tem certeza que deseja deletar essa linha?')
        if(isOk) {
          this.delete(user)
        }
      }
      
      this.tbody.append(row)
    })
  }

  createRow() {
    const tr = document.createElement('tr')

    tr.innerHTML = `
      <td class="user">
        <img src="https://github.com/kauednar.png" alt="Foto de Kauê Ednar">
        <a href="https://github.com/kauednar" target="_blank">
          <p>Kauê Ednar</p>
          <span>kauednar</span>
        </a>
      </td>
      <td class="repositories">10</td>
      <td class="followers">2</td>
      <td>
        <button class="remove">&times;</button>
      </td>
    `

    return tr
  }
    
  removeAllTr() {
    
    this.tbody.querySelectorAll('tr')
    .forEach((tr) => {
      tr.remove()
    })
  }
}