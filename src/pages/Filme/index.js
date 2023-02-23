import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../../services/api'
import './filme-info.css'
import { toast } from 'react-toastify'

function Filme() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [filme, setFilme] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: '8002929166c0afe16bb714505b40506d',
            language: 'pt-BR'
          }
        })
        .then(response => {
          setFilme(response.data)
          setLoading(false)
        })
        .catch(() => {
          navigate('/', { replace: true })
          return
        })
    }
    loadFilme()

    return () => {
      console.log('desmontadoooooooo')
    }
  }, [navigate, id])

  function salvarFilme() {
    const minhaLIsta = localStorage.getItem('@primeflix')

    let filmesSalvos = JSON.parse(minhaLIsta) || []

    const hasFilme = filmesSalvos.some(
      filmesSalvo => filmesSalvo.id === filme.id
    )

    if (hasFilme) {
      toast.warn('Esse Filme Já Está Na Sua Lista!')
      return
    }
    filmesSalvos.push(filme)
    localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos))
    toast.success('Filme Salvo Com Sucesso!')
  }

  if (loading) {
    return <div className="c-loader"></div>
  }

  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
        alt={filme.title}
      />
      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <strong>Avaliação: {filme.vote_average} / 10</strong>

      <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a
            target="_blank"
            rel="external"
            href={`https://youtube.com/results?search_query=${filme.title}Trailer`}
          >
            Trailer
          </a>
        </button>

        <Link to="/">
          <button>Voltar</button>
        </Link>
      </div>
    </div>
  )
}

export default Filme
