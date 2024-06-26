import Box from "@mui/material/Box";
import { Pokemon } from "pokenode-ts";
import { useEffect, useState } from "react";
import Loader from "../components/common/Loader";
import Content from "../components/detail/Content";
import HomeIcon from "../components/icons/HomeIcon";
import SubTitle from "../components/detail/SubTitle";
import { useNavigate, useParams } from "react-router-dom";
import { NameWrapper } from "../components/detail/NameWrapper";
import { TypeWrapper } from "../components/common/TypeWrapper";
import { fetchSpecificPokemonHandler } from "../api/pokemon-api";
import { ContentWrapper } from "../components/detail/ContentWrapper";

const Detail = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [specificPokemon, setSpecificPokemon] = useState<Pokemon>();
  const id = parseInt(params.id ?? "0");
  const height = specificPokemon?.height && specificPokemon?.height / 10;
  const weight = specificPokemon?.weight && specificPokemon?.weight / 10;

  const fetchPokemon = async () => {
    try {
      const result = await fetchSpecificPokemonHandler(params.id as string);
      result && setSpecificPokemon(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, [id]);

  return (
    <>
      <HomeIcon
        fontSize="large"
        sx={{
          position: "absolute",
          top: 40,
          "&:hover": {
            color: "red",
            transition: "all 0.3s ease-in-out",
            cursor: "pointer",
          },
        }}
        onClick={() => {
          navigate("/");
        }}
      />
      {specificPokemon ? (
        <Box
          sx={{
            maxWidth: "600px",
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            mx: "auto",
            my: 2,
            p: 2,
            bgcolor: "white",
            borderRadius: 5,
          }}
        >
          <NameWrapper specificPokemon={specificPokemon} />

          <Box>
            <Box
              component="img"
              src={specificPokemon?.sprites.front_default ?? ""}
              alt={specificPokemon?.name}
              sx={{ width: "300px", height: "300px", objectFit: "cover", overflow: "hidden" }}
            />
          </Box>

          <TypeWrapper pokemon={specificPokemon} width="200px" />

          <ContentWrapper mt="20px" mb="0">
            <SubTitle title="Height" mx="" />
            <SubTitle title="Weight" mx="" />
          </ContentWrapper>
          <ContentWrapper>
            <Content content={`${height?.toFixed(1)} m`} p="0" />
            <Content content={`${weight?.toFixed(1)} kg`} p="0" />
          </ContentWrapper>

          <SubTitle title="Ability" />
          <ContentWrapper>
            {specificPokemon?.abilities.map((e) => {
              return <Content key={e.ability.name} content={e.ability.name} color="lightcyan" />;
            })}
          </ContentWrapper>

          <SubTitle title="Stat" />
          <Box sx={{ mb: 2 }}>
            {specificPokemon?.stats.map((e) => {
              return (
                <Box key={e.stat.name} sx={{ display: "flex", justifyContent: "center" }}>
                  <Content content={e.stat.name} color="lightgreen" width="180px" />
                  <Content content={e.base_stat.toString()} color="lightcoral" width="50px" />
                </Box>
              );
            })}
          </Box>
        </Box>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Detail;
