import { useEffect, useState } from "react";
import { SideBar } from "../../components/SideBar";
import { ContainerMain, ContainerSection, GridLayout } from "../../components/Container";
import { Search } from "../../components/Input";
import { Timestamp } from "../../components/Timestamp";
import { Player } from "../../components/Player";
import { formatDuration } from "../../services/formatService";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import { ModalFiles } from "../../components/Modal";
import { api } from "../../services/apiService";
import WaveSurfer from "wavesurfer.js";
import Hover from "wavesurfer.js/dist/plugins/hover.esm";

export function VisualizarAudio() {
    const { path } = useParams();
    const [data, setData] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState("00:00");
    const [currentTime, setCurrentTime] = useState("00:00");
    const [search, setSearch] = useState("");
    const [state, setState] = useState(false);
    const [wavesurfer, setWavesurfer] = useState(null);

    const getFile = async () => {
        try {
            const response = await api.get(`/Arquivos/${path}`);
            setData(response.data);
        } catch (error) {
            console.error("Erro ao buscar arquivo:", error);
        }
    };

    const initializeWaveSurfer = (containerId, audioUrl) => {
        const ws = WaveSurfer.create({
            container: `#play-container`,
            url: audioUrl,
            height: 30,
            width: 200,
            waveColor: `gray`,
            progressColor: `white`,
            barRadius: 35,
            barWidth: 4,
            barHeight: 7,
            autoplay: false,
            plugins: [
                Hover.create({
                    lineColor: "#fff",
                    lineWidth: 2,
                    labelBackground: "#555",
                    labelColor: "#fff",
                    labelSize: "11px",
                }),
            ],
        });

        ws.on("ready", () => {
            setDuration(formatDuration(ws.getDuration()));
        });

        ws.on("audioprocess", () => {
            setCurrentTime(formatDuration(ws.getCurrentTime()));
        });

        ws.on("seek", () => {
            setCurrentTime(formatDuration(ws.getCurrentTime()));
        });

        setWavesurfer(ws);
    };

    useEffect(() => {
        setSearch(localStorage.getItem(`search`));
        getFile();
    }, []);

    useEffect(() => {
        if (data && data.path) {
            initializeWaveSurfer("play-container", data.path);
        }

        return () => {
            if (wavesurfer) {
                wavesurfer.destroy();
            }
        };
    }, [data]);

    const handlePlayPause = () => {
        if (wavesurfer) {
            wavesurfer.playPause();
            setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        if (duration === currentTime) {
            setIsPlaying(false);
        }
    }, [currentTime]);

    return (
        data && (
            <ContainerMain>
                <ModalFiles visible={state} setVisible={setState} />
                <SideBar state={state} setState={setState} />
                <ContainerSection>
                    <Header />
                    <GridLayout className={`mt-10`}>
                        <Search className={`self-center`} search={search} setSearch={setSearch} />
                        <Player
                            onReady={() => { }}
                            status={isPlaying}
                            time={currentTime}
                            duration={duration}
                            onClick={handlePlayPause}
                            path={data.path}
                        />
                        <div className="w-full h-[300px] overflow-auto">
                            {Object.entries(data.descricao.text)
                                .filter(([key, value]) =>
                                    value.toLowerCase().includes(search.toLowerCase())
                                )
                                .map(([key, value], i) => (
                                    <Timestamp
                                        key={i}
                                        obj={{ key, value }}
                                        search={search}
                                        onClick={() => {
                                            const timeParts = key.split(":").map(Number);
                                            const seconds =
                                                timeParts[0] * 3600 + timeParts[1] * 60 + timeParts[2];
                                            if (wavesurfer) {
                                                wavesurfer.setTime(seconds);

                                                if (!isPlaying) wavesurfer.play();
                                                setIsPlaying(true);
                                            }
                                            setCurrentTime(formatDuration(seconds));
                                        }}
                                    />
                                ))}
                        </div>
                    </GridLayout>
                </ContainerSection>
            </ContainerMain>
        )
    );
}
