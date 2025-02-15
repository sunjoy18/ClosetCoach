import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

const Recommend = () => {
    const [instruction, setInstruction] = useState("")
    const [recommendedOutfit, setRecommendedOutfit] = useState("")
    const [input, setInput] = useState("")
    const [generatedUrl, setGeneratedUrl] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const userId = localStorage.getItem("userId")
        axios.get(`http://localhost:3001/instruction/${userId}`).then((res) => {
            if (res?.data?.success) {
                console.log("Instruction fetched : ", res?.data?.instruction)
                setInstruction(res?.data?.instruction)
                // setInstruction("I'm a tall, athletic man with broad shoulders and a narrow waist. I prefer sharp, tailored suits that highlight my V-shaped torso.")
            }
            else {
                console.log("ERROR  : ", res?.data?.message)
            }
        })
    }, [])

    useEffect(() => {
        console.log("Loading state: ", isLoading);
    }, [isLoading]);

    const handleGenerate = async () => {
        console.log("Clicked");
        setIsLoading(true); // Start loading

        try {
            console.log("Input : ", input);

            const res1 = await axios.post("http://127.0.0.1:8000/recommend", null, {
                params: {
                    instruction: instruction,
                    event: input,
                },
            });

            console.log("Recommended outfit : ", res1?.data);
            setRecommendedOutfit(res1?.data?.recommendation);

            const res2 = await axios.post("http://127.0.0.1:8000/generate", { outfit: res1?.data?.recommendation });

            console.log("GENERATED IMAGE URL: ", res2?.data?.image_url);
            setGeneratedUrl(res2?.data?.image_url);
        }
        catch (err) {
            console.log("Error : ", err);
        }
        finally {
            setIsLoading(false); // Stop loading only after everything completes
        }
    };

    return (
        <div
            style={{
                padding: "2rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                backgroundColor: "#f5f5f5",
            }}
        >
            <div
                style={{
                    display: "flex",
                    gap: "2rem",
                    padding: "2rem",
                    backgroundColor: "white",
                    borderRadius: "24px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    maxWidth: "800px",
                    width: "100%",
                }}
            >
                {/* Left Section */}
                <div
                    style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        padding: "1rem",
                        borderRadius: "16px",
                        backgroundColor: "#fafafa",
                    }}
                >
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Input......"
                        style={{
                            width: "100%",
                            padding: "0.75rem",
                            borderRadius: "8px",
                            border: "1px solid #e5e5e5",
                            fontSize: "1rem",
                        }}
                    />
                    <button
                        onClick={() => {
                            setIsLoading(true);
                            handleGenerate(); // Call the function properly
                        }}
                        disabled={isLoading}
                        style={{
                            padding: "0.75rem 1.5rem",
                            backgroundColor: isLoading ? "#333" : "#000",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "1rem",
                            fontWeight: "500",
                            transition: "background-color 0.2s",
                            width: "100%",
                        }}
                    >
                        {isLoading ? (
                            <div style={{
                                display: 'flex', width: '100%', justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <StyledWrapper>
                                    <div className="newtons-cradle">
                                        <div className="newtons-cradle__dot" />
                                        <div className="newtons-cradle__dot" />
                                        <div className="newtons-cradle__dot" />
                                        <div className="newtons-cradle__dot" />
                                    </div>
                                </StyledWrapper>
                            </div>
                        ) : "Generate"}
                    </button>
                </div>

                {/* Right Section */}
                <div
                    style={{
                        flex: 1,
                        backgroundColor: "#fafafa",
                        borderRadius: "16px",
                        padding: "1rem",
                        minHeight: "200px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                    }}
                >
                    {isLoading ? (
                        <div
                            style={{
                                width: "50px",
                                height: "50px",
                                border: "5px solid #ccc",
                                borderTopColor: "#000",
                                borderRadius: "50%",
                                animation: "spin 1s linear infinite",
                            }}
                        />
                    ) : generatedUrl ? (
                        <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                            <img src={generatedUrl} width="100%" height="100%" alt="generated image" />
                            <p>{recommendedOutfit.replace(/^Outfit Combination \d+: -\s*/, "")}</p>
                        </div>
                    ) : (
                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                position: "relative",
                            }}
                        >
                            <div
                                style={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <div
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: "8px",
                                        position: "relative",
                                    }}
                                >
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            background: `
                      linear-gradient(to bottom right, transparent calc(50% - 1px), #ccc, transparent calc(50% + 1px)),
                      linear-gradient(to top right, transparent calc(50% - 1px), #ccc, transparent calc(50% + 1px))
                    `,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
        </div>
    )
}

export default Recommend

const StyledWrapper = styled.div`
  .newtons-cradle {
   --uib-size: 50px;
   --uib-speed: 1.2s;
   --uib-color: white;
   position: relative;
   display: flex;
   align-items: center;
   justify-content: center;
   width: var(--uib-size);
   height: var(--uib-size);
  }

  .newtons-cradle__dot {
   position: relative;
   display: flex;
   align-items: center;
   height: 100%;
   width: 25%;
   transform-origin: center top;
  }

  .newtons-cradle__dot::after {
   content: '';
   display: block;
   width: 100%;
   height: 25%;
   border-radius: 50%;
   background-color: var(--uib-color);
  }

  .newtons-cradle__dot:first-child {
   animation: swing var(--uib-speed) linear infinite;
  }

  .newtons-cradle__dot:last-child {
   animation: swing2 var(--uib-speed) linear infinite;
  }

  @keyframes swing {
   0% {
    transform: rotate(0deg);
    animation-timing-function: ease-out;
   }

   25% {
    transform: rotate(70deg);
    animation-timing-function: ease-in;
   }

   50% {
    transform: rotate(0deg);
    animation-timing-function: linear;
   }
  }

  @keyframes swing2 {
   0% {
    transform: rotate(0deg);
    animation-timing-function: linear;
   }

   50% {
    transform: rotate(0deg);
    animation-timing-function: ease-out;
   }

   75% {
    transform: rotate(-70deg);
    animation-timing-function: ease-in;
   }
  }`;